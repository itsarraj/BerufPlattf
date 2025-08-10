import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { config } from '../utils/config';

export function registerJobReadinessTools(server: McpServer) {
  server.registerTool(
    'generate_job_readiness',
    {
      title: 'Job Readiness Generator',
      description: 'Generate job readiness score or improvement tips',
      inputSchema: {
        resumeText: z.string().describe('Full resume text'),
        prompt: z.string().describe('Extra instructions for model'),
      },
    },
    async ({ resumeText, prompt }) => {
      const body = {
        model: config.DEFAULT_MODEL,
        prompt: `[INST] ${prompt}\n\nRESUME:\n${resumeText}\n[/INST]`,
        stream: false,
      };

      try {
        const res = await fetch(config.ML_VOCA_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errorText = await res.text();
          return {
            content: [{ type: 'text', text: `Error: ${errorText}` }],
            isError: true,
          };
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: data.response }],
          isError: false,
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Network error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}