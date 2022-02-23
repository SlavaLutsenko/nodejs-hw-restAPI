const { Router } = require("express");
const { authorize } = require("../middleware/authorize.middleware");
const { validateSignupSchema, validateLoginSchema } = require("./auth.schemas");
const {
  signUpUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("./auth.service");

const authRouter = Router();

authRouter.post("/signup", validateSignupSchema, signUpUser);

authRouter.post("/login", validateLoginSchema, loginUser);

authRouter.get("/logout", authorize(), logoutUser);

authRouter.get("/current", authorize(), getCurrentUser);

exports.authRouter = authRouter;
