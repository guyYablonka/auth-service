import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { env } from "../config/config";

const router = express.Router();

router.get(
  "/api/users/oauth",
  passport.authenticate("google", {
    scope: ["email profile https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  async (req: any, res) => {
    const { id, email } = req.user;
    const userJwt = jwt.sign(
      {
        id,
        email,
      },
      env.JWT_KEY!
    );

    req.session!.jwt = userJwt;
    res.status(200).send(req.user);
  }
);

export { router as oauthRouter };
