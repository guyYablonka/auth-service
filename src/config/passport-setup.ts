import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import { BadRequestError } from "../errors/bad-request-error";

import { User } from "../models/user";
import { env } from "./config";

declare global {
  namespace Express {
    interface User {
      id?: string;
    }
  }
}

const GoogleStrategy = googleStrategy.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
    },
    (_accessToken, _refreshToken, profile, done) => {
      const { displayName, _json } = profile;
      const { sub: username, name, picture, email } = _json;
      console.log("passport use", {
        username,
        name,
        picture,
        email,
        displayName,
      });

      User.findOne({ email }).then((currentUser) => {
        if (currentUser) {
          console.log("user signin with user: ", currentUser);
          done(null, currentUser);
        } else {
          if (!email) {
            throw new BadRequestError("email must be provided!");
          }

          const user = User.build({ username, displayName, email, picture });

          user.save().then((newUser) => {
            console.log("new user created: ", newUser);
            done(null, newUser);
          });
        }
      });
    }
  )
);
