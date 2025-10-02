import { createMcpHandler } from "mcp-handler";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "~/lib/auth";

const handler = async (
  req: NextRequest,
  { params }: { params: Promise<{ transport: string }> },
) => {
  const { transport } = await params;

  console.log({ transport });

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

      server.tool(
        "create-group",
        "Create a new group",
        {
          name: z.string(),
          slug: z.string(),
          description: z.string(),
          logo: z.string(),
        },
        async ({ name, slug, description, logo }) => {
          return {
            content: [{ type: "text", text: `Group created: ${name}` }],
          };
        },
      );

      server.tool(
        "create-event",
        "Create a new event",
        {
          name: z.string(),
          description: z.string(),
          location: z.string(),
        },
        async ({ name, description, location }) => {
          return {
            content: [{ type: "text", text: `Event created: ${name}` }],
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
      basePath: `/mcp`,
      verboseLogs: true,
      maxDuration: 60,
    },
  )(req);
};

export { handler as DELETE, handler as GET, handler as POST };
