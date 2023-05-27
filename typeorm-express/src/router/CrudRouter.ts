import * as express from "express";
import { Router } from "express";
import { CrudController } from "../controller/CrudContoller";
import * as passport from "passport";

const auth = passport.authenticate("jwt-authentication", { session: false });

type ObjectType<T> = { new (): T } | Function;

export function initRouter<T>(
    type: ObjectType<T>,
    ...exlude: string[]
): Router {
    const controller = new CrudController(type);

    let router: Router = express.Router();

    if (!exlude.includes("getAll")) {
        router.get("/", auth, controller.getAll);
    }
    if (!exlude.includes("saveOne")) {
        router.post("/", auth, controller.saveOne);
    }
    if (!exlude.includes("getOne")) {
        router.get("/:id", auth, controller.getOne);
    }
    if (!exlude.includes("updateOne")) {
        router.put("/:id", auth, controller.updateOne);
    }
    if (!exlude.includes("deleteOne")) {
        router.delete("/:id", auth, controller.deleteOne);
    }

    return router;
}
