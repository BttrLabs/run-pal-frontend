import { createAuthClient } from "better-auth/react";
import {
  magicLinkClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8787",
  plugins: [magicLinkClient(), lastLoginMethodClient(), nextCookies()],
});

export const { signIn, signUp, useSession } = createAuthClient();
