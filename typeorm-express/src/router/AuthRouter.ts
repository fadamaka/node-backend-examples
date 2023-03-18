import * as express from "express";
import { Router } from "express";
import { register, login } from "../controller/AuthController";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
