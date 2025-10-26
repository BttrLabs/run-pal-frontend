import { createAuthClient } from "better-auth/react";
import {
  magicLinkClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  plugins: [magicLinkClient(), lastLoginMethodClient(), nextCookies()],
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false,
    },
    useSecureCookies: true,
    disableCSRFCheck: false,
    crossSubDomainCookies: {
      enabled: true,
      domain: "runpal.bttr.studio",
    },
    cookies: {
      session_token: {
        name: "bttr_runpal_session_token",
        attributes: {
          httpOnly: true,
          secure: true,
        },
      },
    },
    cookiePrefix: "bttr_runpal",
  },
});

export const { signIn, signUp, useSession } = createAuthClient();
