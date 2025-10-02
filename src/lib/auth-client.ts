import {
  adminClient,
  oneTapClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/env";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
    organizationClient({
      schema: {
        organization: {
          additionalFields: {
            description: {
              type: "string",
              required: false,
              input: true,
            },
          },
        },
      },
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
