import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { auth } from "~/lib/auth";

const handler = async (req: Request) => {
  // session contains the access token record with scopes and user ID
  const session = await auth.api.getMcpSession({
    headers: req.headers,
  });
  if (!session) {
    //this is important and you must return 401
    return new Response(null, {
      status: 401,
    });
  }
  return createMcpHandler(
    (server) => {
      server.tool(
        "echo",
        "Echo a message",
        { message: z.string() },
        async ({ message }) => {
          return {
            content: [{ type: "text", text: `Tool echo: ${message}` }],
          };
        },
      );
    },
    {
      capabilities: {
        tools: {
          echo: {
            description: "Echo a message",
          },
        },
      },
    },
    {
      // redisUrl: process/.env.REDIS_URL,
      basePath: "/api/mcp",
      verboseLogs: true,
      maxDuration: 60,
    },
  )(req);
};

export { handler as DELETE, handler as GET, handler as POST };
