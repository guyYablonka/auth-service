import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import {
  validationRequest,
  BadRequestError,
} from "@yablonka-services/err-and-middle";
import { User } from "../models/user";
import { env } from "../config/config";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();
    console.log(`user ${email} has been created.`);

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.JWT_KEY!
    );

    // Store it on session object
    req.session!.jwt = userJwt;
    res.cookie("session", userJwt, { httpOnly: true });
    console.log(`cookies of ${email} has been set.`);

    res.status(201).send(user);
  }
);

export { router as signupRouter };
