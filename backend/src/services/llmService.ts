import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

class LLMService {
  private client: Client;
  private isConnected = false;

  constructor() {
    this.client = new Client({
      name: 'streamable-http-client',
      version: '1.0.0',
    });
  }

  async connect() {
    if (this.isConnected) return;
    
    try {
      const transport = new StreamableHTTPClientTransport(
        new URL(process.env.MCP_SERVER_URL || 'http://localhost:3000/mcp')
      );
      
      await this.client.connect(transport);
      this.isConnected = true;
      console.log('✅ Connected to MCP server');
    } catch (error) {
      console.error('❌ Failed to connect to MCP server:', error);
      throw new Error(`MCP connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async callTool(toolName: string, args: Record<string, unknown>) {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: args
      });
      
      console.log('✅ Tool call successful:', { toolName, result });
      return result;
    } catch (error) {
      console.error('❌ Tool call failed:', { toolName, args, error });
      throw new Error(`Tool call error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async disconnect() {
    if (this.isConnected) {
      // Add cleanup if the SDK provides it
      this.isConnected = false;
      console.log('✅ Disconnected from MCP server');
    }
  }
}

export const llmService = new LLMService();