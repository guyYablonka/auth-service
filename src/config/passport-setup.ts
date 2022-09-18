import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import { BadRequestError } from "../errors/bad-request-error";

import { User } from "../models/user";

const GoogleStrategy = googleStrategy.Strategy;

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    },
    (accessToken, refreshToken, profile, done) => {
      const { username, displayName, emails, profileUrl } = profile;
      console.log(profile);
      // if (emails?.length === 0) {
      //   throw new BadRequestError("email must be provided");
      // }

      // User.findOne({ username }).then((currUser) => {
      //   if (currUser) {
      //     done(null, currUser);
      //   } else {
      //     const user = User.build({
      //       username,
      //       displayName,
      //       email: emails![0].value,
      //       profileUrl,
      //     });

      //     user.save().then((newUser) => {
      //       console.log("new user created: ", newUser);
      //       done(null, newUser);
      //     });
      //   }
      // });
    }
  )
);
