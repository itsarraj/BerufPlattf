import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "./tools/index";

export const server = new McpServer({
  name: "recruiting-assistant",
  version: "1.0.0",
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
