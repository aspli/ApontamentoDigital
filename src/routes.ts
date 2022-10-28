import { Router } from "express";
import { ApontamentoController } from "./controllers/ApontamentoController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post('/login', new LoginController().login);

routes.use(authMiddleware); //As rotadas abaixo desta chamada necessitam de autenticação
routes.get('/profile', new LoginController().getProfile);

routes.get('/user', new UserController().list);
routes.post('/user/create', new UserController().create);

routes.get('/apontamento', new ApontamentoController().list);
routes.post('/apontamento/create', new ApontamentoController().createApontamento);
routes.get('/apontamento/relatorio', new ApontamentoController().relatorio);

export default routes;