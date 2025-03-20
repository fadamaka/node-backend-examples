import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { BaseEntity } from "../entity/BaseEntity";

export type ObjectType<T> = { new (): BaseEntity } | Function;

export class CrudController<T> {
    private type: ObjectType<T>;
    constructor(type: ObjectType<T>) {
        this.type = type;
    }
    getAll = async (req: Request, res: Response) => {
        const entities = await AppDataSource.getRepository(this.type).find();
        res.json(entities);
    };

    getOne = async (req: Request, res: Response) => {
        const results = await AppDataSource.getRepository(this.type).findOneBy({
            id: parseInt(req.params.id),
        });
        return res.send(results);
    };

    saveOne = async (req: Request, res: Response) => {
        const entityBody = Object.assign(
            new (this.type as new () => BaseEntity)(),
            req.body
        );
        const errors = await validate(entityBody);
        if (errors.length > 0) {
            res.status(400);
            return res.send(
                JSON.stringify({
                    validationErrors: errors.flatMap((e) =>
                        Object.values(e.constraints)
                    ),
                })
            );
        }
        const user = await AppDataSource.getRepository(this.type).create(
            entityBody
        );
        const results = await AppDataSource.getRepository(this.type).save(user);
        return res.send(results);
    };

    updateOne = async (req: Request, res: Response) => {
        const user = await AppDataSource.getRepository(this.type).findOneBy({
            id: parseInt(req.params.id),
        });
        AppDataSource.getRepository(this.type).merge(user, req.body);
        const results = await AppDataSource.getRepository(this.type).save(user);
        return res.send(results);
    };

    deleteOne = async (req: Request, res: Response) => {
        const results = await AppDataSource.getRepository(this.type).delete(
            req.params.id
        );
        return res.send(results);
    };
}
