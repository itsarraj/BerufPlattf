import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

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
        model: "deepseek-r1:1.5b", // deepseek's response is only correct
        // model: "tinyllama",
        prompt: `[INST] ${prompt}\n\nRESUME:\n${resumeText}\n[/INST]`,
        stream: false,
      };

      try {
        const res = await fetch('https://mlvoca.com/api/generate', {
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
    console.log("----------------\n")
    console.log("----------------\n", data)
    console.log("----------------\n")
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
