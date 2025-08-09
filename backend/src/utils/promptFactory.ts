// bff/src/utils/promptFactory.ts
import { z } from 'zod';

import { PromptFactoryConfig } from "./jobReadinessUtils";

// ========================
// COVER LETTER CONFIGURATION
// ========================
export type CoverLetterType = 'STANDARD' | 'TECHNICAL' | 'CREATIVE';

export const CoverLetterConfig: PromptFactoryConfig<CoverLetterType> = {
  featureName: 'cover-letter',
  schemas: {
    STANDARD: z.object({
      introduction: z.string(),
      qualifications: z.array(z.string()),
      closing: z.string()
    }),
    TECHNICAL: z.object({
      tech_skills: z.array(z.string()),
      project_experience: z.array(z.string()),
      call_to_action: z.string()
    }),
    CREATIVE: z.object({
      hook: z.string(),
      unique_angle: z.string(),
      creative_closing: z.string()
    })
  },
  basePrompts: {
    STANDARD: `Generate a professional cover letter...`,
    TECHNICAL: `Create a technically-focused cover letter...`,
    CREATIVE: `Write a creative cover letter...`
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
// COVER LETTER FACTORY
// ========================
export const coverLetterFactory = createPromptFactory(CoverLetterConfig);