import type { NextAuthOptions } from "next-auth";
import { MockProvider } from "./provider";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: `${basePath}/login`, // Redirect users to "/login" when signing in
    // error: "/error",
  },
  callbacks: {
    async signIn({}) {
      console.log("signIn");
      return true;
    },
    async redirect(res) {
      console.log("baseUrl", res);
      return process.env.NEXT_PUBLIC_SDK_URL || `http://localhost/sdk`;
    },
    async session({ session }) {
      console.log("session", session);
      return session;
    },
    async jwt({ token }) {
      console.log("token", token);
      return token;
    },
  },
  // // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXT_PUBLIC_SECRET,
  // Configure authentication providers
  providers: [MockProvider],
};
