import { Router } from "express";
import { ApontamentoController } from "./controllers/ApontamentoController";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post('/login', new LoginController().login);
routes.post('/user', new UserController().create);

routes.use(authMiddleware); //As rotadas abaixo desta chamada necessitam de autenticação
routes.get('/profile', new LoginController().getProfile);

routes.get('/user', new UserController().list);
routes.delete('/user', new UserController().delete);

routes.get('/apontamento', new ApontamentoController().list);
routes.post('/apontamento', new ApontamentoController().createApontamento);
routes.delete('/apontamento', new ApontamentoController().delete);
routes.get('/apontamento/report', new ApontamentoController().relatorio);


export default routes;