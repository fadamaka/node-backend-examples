import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const SECRET_KEY = process.env.SECRET_KEY;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
};

passport.use(
    "jwt-authentication",
    new Strategy(options, async (payload, done) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: payload.id },
        });

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
);
