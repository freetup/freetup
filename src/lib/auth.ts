import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { db } from "~/db"; // your drizzle instance
import { env } from "~/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    organization({
      schema: {
        organization: {
          modelName: "organisation",
          additionalFields: {
            description: {
              type: "string",
              required: false,
              input: true,
            },
          },
        },
        member: {
          fields: { organizationId: "organisationId" },
        },
        session: {
          fields: { activeOrganizationId: "activeOrganisationId" },
        },
        invitation: {
          fields: { organizationId: "organisationId" },
        },
      },
    }),
  ],
});
