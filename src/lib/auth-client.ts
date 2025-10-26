import { createAuthClient } from "better-auth/react";
import {
  magicLinkClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  plugins: [magicLinkClient(), lastLoginMethodClient(), nextCookies()],
});

export const { signIn, signUp, useSession } = createAuthClient();
