import * as express from "express";
import userRouter from "./router/UserRouter";
import authRouter from "./router/AuthRouter";
import "./service/passport";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.use("/auth", authRouter);

export default app;
