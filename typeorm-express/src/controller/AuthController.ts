import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const SALT_ROUND = Number(10);
const SECRET_KEY = "secret";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        res.status(400).send({
            message: "Email already taken",
        });
    } else {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await userRepository.create({
            name: name,
            email: email,
            password: hashPassword,
        });

        await userRepository.save(user);

        res.send({ message: "User created" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        email: email,
    });

    if (!user) {
        res.status(400).send({ message: "Invalid email or password" });
    } else {
        const isSuccess = await bcrypt.compare(password, user.password);

        if (isSuccess) {
            const payload = {
                id: user.id,
                name: user.name,
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
            res.status(200).send({ token });
        } else {
            res.status(400).send({ message: "Invalid email or password" });
        }
    }
};
