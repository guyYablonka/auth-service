import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import Password from "../services/password";
import {
  BadRequestError,
  validationRequest,
} from "@yablonka-services/err-and-middle";
import { User } from "../models/user";
import { env } from "../config/config";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser || !existingUser.password) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      env.JWT_KEY!
    );

    // Store it on session object
    if (env.NODE_ENV !== "local") {
      req.session = { jwt: userJwt };
    } else {
      res.cookie("session", userJwt, { httpOnly: true });
    }

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
