import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { ServerPersistors, SSRKeycloakProvider } from "@react-keycloak/razzle";
import cookieParser from "cookie-parser";
import { StaticRouter } from "react-router";
import runtimeConfig from "./utils/config";
import App from "./App";
import { keycloakConfig } from "./auth/keycloak";

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser())
  .get("/*", (req, res) => {
    const context = {};
    const cookiePersistor = ServerPersistors.ExpressCookies(req);

    const markup = renderToString(
      <SSRKeycloakProvider
      
        keycloakConfig={keycloakConfig}
        persistor={cookiePersistor}
      >
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </SSRKeycloakProvider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <style>
                body {
                  background-color: #f0f2f5 !important;
                }
              </style>
              <title>I-Talent</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <meta
                name="description"
                content="Search tool to find people based on experience and skills"
              />
              ${
                assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ""
              }
              ${
                process.env.NODE_ENV === "production"
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
              <div id="root">${markup}</div>
              <script>window.env = ${serialize(runtimeConfig)};</script>
          </body>
        </html>`
      );
    }
  });

export default server;
