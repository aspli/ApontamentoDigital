import { Router } from "express";
import { ApontamentoController } from "./controllers/ApontamentoController";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.get('/user', new UserController().list);
routes.post('/user/create', new UserController().create);

routes.get('/apontamento', new ApontamentoController().list);
routes.post('/apontamento/:idUser/create', new ApontamentoController().createApontamento);

export default routes;