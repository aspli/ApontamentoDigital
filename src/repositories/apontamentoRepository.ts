import { AppDataSource } from "../data-source";
import { Apontamento } from "../entities/Apontamento";

export const apontamentoRepository = AppDataSource.getRepository(Apontamento)