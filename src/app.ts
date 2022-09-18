import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { oauthRouter } from "./routes/oauth";
import "./config/passport-setup";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
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
