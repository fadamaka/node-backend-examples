import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import app from "./server";

AppDataSource.initialize()
    .then(async () => {
        const users = await AppDataSource.manager.find(User);
        console.log("Loaded users: ", users);
        app.listen(3000);
    })
    .catch((error) => console.log(error));
