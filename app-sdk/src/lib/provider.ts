import { OAuthConfig } from "next-auth/providers/oauth";

const issuer = process.env.NEXT_PUBLIC_ISSUER;
const sdkHost = process.env.NEXT_PUBLIC_SDK_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MockProvider: OAuthConfig<any> = {
  id: "MockProvider",
  name: "MockProvider",
  version: "2.0",
  type: "oauth",
  wellKnown: `${issuer}/.well-known/openid-configuration`,
  authorization: {
    url: `${issuer}/authorize`,
    params: {
      redirect_uri: sdkHost,
      response_type: "code",
      scope: "read write email",
    },
  },
  token: {
    url: `${issuer}/token`,
    params: { grant_type: "client_credentials" },
  },
  // token: `${issuer}/token`,
  userinfo: `${issuer}/userinfo`,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  checks: ["none"],
  profile: (profile) => {
    console.log("profile", profile);
    return {
      id: profile.user.id.toString(),
      name: profile.user.username,
      email: profile.user.email,
    };
  },
};
