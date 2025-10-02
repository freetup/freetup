import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
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
