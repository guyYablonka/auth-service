import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/api/users/oauth",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user);
  }
);

export { router as oauthRouter };
