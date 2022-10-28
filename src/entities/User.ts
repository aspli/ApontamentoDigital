import {    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
} from "typeorm";
import { Apontamento } from "./Apontamento";

@Entity('users')
export class User {

@PrimaryGeneratedColumn()
id_user: number;

@Column({type: 'text', unique: true})
nome: string;

@Column({type: 'text'})
cargo: string;

@Column({type: 'text', unique: true})
email: string;

@Column({type: 'text', unique: true})
login: string;

@Column({type: 'text'})
senha: string;

@OneToMany(() => Apontamento, apontamentos => apontamentos.user )
apontamentos: Apontamento[];


}