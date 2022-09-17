import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();

router.get(
  "/api/users/oauth",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/api/users/oauth/redirect",
  passport.authenticate("google"),
  async (req, res) => {
    const existingUser = req.user;

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as oauthRouter };
