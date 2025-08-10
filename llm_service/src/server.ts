import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "./tools/index";
import { config } from "./utils/config";

export const server = new McpServer({
  name: config.MCP_SERVER_NAME,
  version: config.MCP_SERVER_VERSION,
  capabilities: {
    resources: {
      subscribe: true,
      listChanged: true
    },
    tools: {
      listChanged: true
    },
    prompts: {
      listChanged: true
    }
  },
});

registerTools(server);