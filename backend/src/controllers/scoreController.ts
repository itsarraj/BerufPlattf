import { Request, Response } from 'express';
import { llmService } from '../services/llmService';
import { jobReadinessFactory, JobReadinessType } from '../utils/jobReadinessUtils';

export const readinessAnalysis = async (req: Request, res: Response) => {
  try {
    const { resumeText, prompt, analysisType = 'FULL' } = req.body;

    // Validate analysis type
    const validTypes: JobReadinessType[] = ['SCORE', 'IMPROVE', 'FULL'];
    if (!validTypes.includes(analysisType)) {
      return res.status(400).json({
        error: `Invalid analysis type. Must be one of: ${validTypes.join(', ')}`,
        success: false
      });
    }

    if (!resumeText) throw new Error('Missing resumeText');

    // Generate structured prompt using factory
    const systemPrompt = jobReadinessFactory.generatePrompt(analysisType);

    // Retry loop — try up to 10 times to get valid JSON
    let parsed: any = null;
    let rawText: string | null = null;
    const schema = jobReadinessFactory.getSchema(analysisType);

    for (let attempt = 1; attempt <= 10; attempt++) {
      const result: any = await llmService.callTool('generate_job_readiness', {
        resumeText,
        prompt: systemPrompt + 
          (attempt > 1 ? "\nIMPORTANT: Return ONLY the JSON object. No thinking process, no explanations, no markdown." : ""),
      });

      const content = result.content?.[0];
      if (!content || content.type !== 'text') {
        throw new Error('Invalid response format from LLM');
      }

      rawText = content?.text;
      
// Enhanced JSON extraction
let jsonString = rawText;
if (!jsonString) {
  console.warn('Empty response from LLM');
  continue; // Skip to next attempt
}

// Remove thinking process if present
if (jsonString.includes('<think>')) {
  jsonString = jsonString.split('</think>').pop() || jsonString;
}

// Find JSON boundaries
const firstBrace = jsonString.indexOf('{');
const lastBrace = jsonString.lastIndexOf('}');

if (firstBrace === -1 || lastBrace === -1) {
  console.warn('No JSON object found in response');
  continue; // Skip to next attempt
}

// Extract the JSON portion
jsonString = jsonString.substring(firstBrace, lastBrace + 1);

try {
  const candidate = JSON.parse(jsonString);
  const validation = schema.safeParse(candidate);

  if (validation.success) {
    parsed = validation.data;
    break; // ✅ valid JSON, exit loop
  }
} catch (error) {
  console.warn('JSON parse error:', error);
  // JSON parse failed, continue loop
}
      console.warn(`⚠️ Attempt ${attempt} failed JSON validation, retrying...`);
    }

    if (!parsed) {
      return res.status(500).json({
        success: false,
        error: 'Validation failed after retries',
        rawResponse: rawText,
      });
    }

    res.json({
      success: true,
      type: analysisType,
      data: parsed,
    });
  } catch (error) {
    console.error('❌ Job readiness endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false,
    });
  }
};