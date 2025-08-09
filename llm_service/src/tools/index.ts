import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerJobReadinessTools } from "./jobReadiness";

export function registerTools(server: McpServer) {
  registerJobReadinessTools(server);
}