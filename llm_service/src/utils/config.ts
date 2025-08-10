import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MCP_SERVER_NAME: z.string().default('recruiting-assistant'),
  MCP_SERVER_VERSION: z.string().default('1.0.0'),
  DANGEROUSLY_OMIT_AUTH: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  ML_VOCA_API_URL: z.string().url(),
  DEFAULT_MODEL: z.string(),
});

export const config = envSchema.parse(process.env);