import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
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
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: env.NODE_ENV !== "test",
  })
);

app.use(cors());
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
