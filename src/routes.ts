import { Router } from "express";
import { ApontamentoController } from "./controllers/ApontamentoController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.get('/user', new UserController().list);
routes.post('/user/create', new UserController().create);
routes.post('/login', new LoginController().login);

routes.get('/apontamento', new ApontamentoController().list);
routes.post('/apontamento/:idUser/create', new ApontamentoController().createApontamento);

routes.use(authMiddleware); //As rotadas abaixo desta chamada necessitam de autenticação
routes.get('/profile', authMiddleware, new LoginController().getProfile);

export default routes;