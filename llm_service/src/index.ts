import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { transport } from './transport';
import { server } from './server';
import { createServer } from 'node:http';
import { config } from './utils/config';

async function main() {
  try {
    await server.connect(transport);

    const httpServer = createServer((req, res) => {
      transport.handleRequest(req, res);
    });

    // Default: listens on localhost
    httpServer.listen(config.PORT, () => {
      console.log(`MCP server listening on http://localhost:${config.PORT}`);
    });


    console.log('MCP Server running');
  } catch (error) {
    console.error('Error starting MCP Server:', error);
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
