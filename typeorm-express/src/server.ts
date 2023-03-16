import * as express from "express";
import userRouter from "./router/UserRouter";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

export default app;
