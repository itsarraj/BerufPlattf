// bff/src/utils/jobReadinessUtils.ts
import { z } from 'zod';

// ======================
// BASE FACTORY INTERFACE
// ======================
export interface PromptFactoryConfig<T extends string> {
  schemas: Record<T, z.ZodSchema<any>>;
  basePrompts: Record<T, string>;
  featureName: string;
}

// ========================
// JOB READINESS CONFIGURATION
// ========================
export type JobReadinessType = 'SCORE' | 'IMPROVE' | 'FULL';

export const JobReadinessConfig: PromptFactoryConfig<JobReadinessType> = {
  featureName: 'job-readiness',
  schemas: {
    SCORE: z.object({
      score: z.number().min(0).max(100),
      reason: z.string(),
      confidence: z.number().min(0).max(1).optional()
    }),
    IMPROVE: z.object({
      improvements: z.array(z.string()),
      severity: z.enum(['low', 'medium', 'high']),
      impactPotential: z.number().min(0).max(100)
    }),
    FULL: z.object({
      score: z.number().min(0).max(100),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      improvementPlan: z.array(z.object({
        action: z.string(),
        priority: z.string()
      }))
    })
  },
  basePrompts: {
    SCORE: `You are to return ONLY a valid JSON object in the following exact structure:
{
  "score": number (0-100),
  "reason": string,
  "confidence": number (0-1, optional)
}
No markdown, no extra text, no explanations. Only the JSON object.`,
    IMPROVE: `You are to return ONLY a valid JSON object in the following exact structure:
{
  "improvements": string[],
  "severity": "low" | "medium" | "high",
  "impactPotential": number (0-100)
}
No markdown, no extra text, no explanations. Only the JSON object.`,
    FULL: `You are to return ONLY a valid JSON object in the following exact structure:
{
  "score": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "improvementPlan": [
    {
      "action": string,
      "priority": string
    }
  ]
}
No markdown, no extra text, no explanations. Only the JSON object.`
  }
};


// ========================
// GENERIC FACTORY FUNCTION
// ========================
export function createPromptFactory<T extends string>(config: PromptFactoryConfig<T>) {
  return {
    getSchema: (type: T) => config.schemas[type],
    generatePrompt: (type: T, customInstruction?: string) => {
      const basePrompt = config.basePrompts[type];
      
      return `
      **${config.featureName.toUpperCase()} ANALYSIS - ${type}**
      RULES:
      1. Respond ONLY with valid JSON
      2. Use double quotes for all strings
      3. Never include markdown or extra text
      4. Follow this exact structure:
      ${basePrompt}
      ${customInstruction ? `\n5. CUSTOM INSTRUCTION: ${customInstruction}` : ''}
      `;
    }
  };
}

// ========================
// JOB READINESS FACTORY
// ========================
export const jobReadinessFactory = createPromptFactory(JobReadinessConfig);