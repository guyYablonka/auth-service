import express from "express";
import session from "express-session";
import "express-async-errors";
import { json } from "body-parser";
import passport from "passport";
import cors from "cors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { oauthRouter } from "./routes/oauth";
import { errorHandler, NotFoundError } from "@yablonka-services/err-and-middle";
import { env } from "./config/config";
import "./config/passport-setup";

const app = express();

app.set("trust proxy", 1);
app.use(json());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      secure: env.NODE_ENV === "production" ? true : false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(oauthRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
