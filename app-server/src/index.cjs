const { OAuth2Server } = require("oauth2-mock-server");

const server = new OAuth2Server();

const port = process.env.PORT || 4002;

async function start() {
  // Generate a new RSA key and add it to the keystore
  await server.issuer.keys.generate("RS256");

  const service = server.service;

  service.once("beforeTokenSigning", (token, req) => {
    const timestamp = Math.floor(Date.now() / 1000);
    token.payload.exp = timestamp + 400;
    console.log(token, "beforeTokenSigning");
  });

  service.once("beforeResponse", (tokenEndpointResponse, req) => {
    console.log(tokenEndpointResponse, "beforeResponse");
  });

  service.once("beforeUserinfo", (userInfoResponse, req) => {
    console.log(userInfoResponse, "beforeUserinfo");
  });

  service.once("beforeRevoke", (revokeResponse, req) => {
    console.log(revokeResponse, "beforeRevoke");
  });

  service.once("beforeAuthorizeRedirect", (authorizeRedirectUri, req) => {
    console.log(authorizeRedirectUri, "beforeAuthorizeRedirect");
  });

  service.once(
    "beforePostLogoutRedirect",
    (postLogoutRedirectUri, req, res) => {
      console.log(postLogoutRedirectUri, "beforePostLogoutRedirect");
    }
  );

  // Start the server
  await server.start(port, "localhost");
  console.log("Issuer URL:", server.issuer.url); // -> http://localhost:4002
}

async function stop() {
  await server.stop();
}

start();

process.on("SIGTERM", () => {
  stop().finally(() => process.exit(0));
});
