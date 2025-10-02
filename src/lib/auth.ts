import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  mcp,
  oAuthProxy,
  oneTap,
  organization,
} from "better-auth/plugins";
import { db } from "~/db";
import { env } from "~/env";

const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const productionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : baseURL;

const origins = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
  .filter(Boolean)
  .map((url) => `https://${url}`);

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [baseURL, ...origins],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${productionURL}/api/auth/callback/google`,
    },
  },
  plugins: [
    oAuthProxy(),
    admin(),
    mcp({
      loginPage: "/login",
    }),
    oneTap(),
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
