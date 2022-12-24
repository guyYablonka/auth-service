import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = undefined;
  res.cookie("session", undefined, { httpOnly: true });

  res.send({});
});

export { router as signoutRouter };
