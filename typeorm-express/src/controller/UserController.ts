import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { resourceUsage } from "process";

export const userController = (app: express.Application) => {
    app.get("/users", async function (req: Request, res: Response) {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    });

    app.get("/users/:id", async function (req: Request, res: Response) {
        const results = await AppDataSource.getRepository(User).findOneBy({
            id: req.params.id,
        });
        return res.send(results);
    });

    app.post("/users", async function (req: Request, res: Response) {
        const userBody = Object.assign(new User(), req.body);
        const errors = await validate(userBody);
        if (errors.length > 0) {
            return res.sendStatus(400);
        }
        const user = await AppDataSource.getRepository(User).create(userBody);
        const results = await AppDataSource.getRepository(User).save(user);
        return res.send(results);
    });

    app.put("/users/:id", async function (req: Request, res: Response) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: req.params.id,
        });
        AppDataSource.getRepository(User).merge(user, req.body);
        const results = await AppDataSource.getRepository(User).save(user);
        return res.send(results);
    });

    app.delete("/users/:id", async function (req: Request, res: Response) {
        const results = await AppDataSource.getRepository(User).delete(
            req.params.id
        );
        return res.send(results);
    });
};
