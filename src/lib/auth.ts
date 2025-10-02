import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, mcp, oAuthProxy, organization } from "better-auth/plugins";
import { db } from "~/db";
import { env } from "~/env";

const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const productionURL = env.PRODUCTION_URL ?? baseURL;

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [productionURL, baseURL],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${productionURL}/api/auth/callback/google`,
    },
  },
  plugins: [
    oAuthProxy({
      productionURL,
      currentURL: baseURL,
    }),
    admin(),
    mcp({
      loginPage: "/login",
    }),
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
