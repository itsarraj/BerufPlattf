import { Request, Response } from 'express';
import { llmService } from '../services/llmService';
import { jobReadinessFactory, JobReadinessType } from '../utils/jobReadinessUtils';

export const readinessAnalysis = async (req: Request, res: Response) => {
  try {
    const { resumeText, prompt } = req.body;
    const analysisType: JobReadinessType = 'FULL'; // Default type

    if (!resumeText) throw new Error('Missing resumeText');

    // Generate structured prompt using factory
    const systemPrompt = jobReadinessFactory.generatePrompt(analysisType);
    // const systemPrompt = jobReadinessFactory.generatePrompt(analysisType, prompt);
    console.log("-------------------------------------------------------------\n")
    console.log("----------------\n", systemPrompt)
    console.log("-------------------------------------------------------------\n")

    const result: any = await llmService.callTool('generate_job_readiness', {
      resumeText,
      prompt: systemPrompt,
    });

    const content = result.content?.[0];
    console.log("-------------------------------------------------------------\n")
    console.log("----------------\n", content)
    console.log("-------------------------------------------------------------\n")
    if (!content || content.type !== 'text') {
      throw new Error('Invalid response format from LLM');
    }
    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    console.log("-------------------------------------------------------------\n")
    console.log("----------------\n", jsonMatch)
    console.log("-------------------------------------------------------------\n")

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("-------------------------------------------------------------\n")
    console.log("----------------\n", parsed)
    console.log("-------------------------------------------------------------\n")
    
    // Get schema using factory
    const schema = jobReadinessFactory.getSchema(analysisType);
    const validation = schema.safeParse(parsed);

    if (!validation.success) {
      return res.status(500).json({
        success: false,
        error: 'Validation failed',
        issues: validation.error.issues,
        rawResponse: content.text.substring(0, 300),
      });
    }

    res.json({
      success: true,
      type: analysisType,
      data: validation.data,
    });
  } catch (error) {
    console.error('❌ Job readiness endpoint error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false,
    });
  }
};