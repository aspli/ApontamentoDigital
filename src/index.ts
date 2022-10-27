import 'express-async-errors' //add o tratamento erros com async
import express from "express";
import { AppDataSource } from "./data-source";
import { errorMidleware } from "./middlewares/error";
import routes from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMidleware);
    return app.listen(process.env.PORT);
});
