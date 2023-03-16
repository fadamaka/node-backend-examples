import * as express from "express";
import { userController } from "./controller/UserController";

const app = express();
app.use(express.json());

userController(app);

// start express server

export default app;
