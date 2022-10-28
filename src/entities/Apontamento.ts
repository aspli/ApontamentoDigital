import {    Column,
            Entity,
            JoinColumn,
            ManyToOne,
            PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity('apontamentos')
export class Apontamento{

@PrimaryGeneratedColumn()
id_apt: number;

@Column({name: 'data_apontamento'})
data_apt: Date;

@Column()
total_minutos: number;

@Column({type: 'text'})
tarefa_realizada: string;

@ManyToOne(() => User, user => user.apontamentos)
@JoinColumn({name: 'user_id'})
user : User;

} 