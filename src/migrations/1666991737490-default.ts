import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666991737490 implements MigrationInterface {
    name = 'default1666991737490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id_user" SERIAL NOT NULL, "nome" text NOT NULL, "cargo" text NOT NULL, "email" text NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, CONSTRAINT "UQ_b4f334ce4e8924c3560dd4ba1d6" UNIQUE ("nome"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "apontamentos" ("id_apt" SERIAL NOT NULL, "data_apontamento" TIMESTAMP NOT NULL, "total_minutos" integer NOT NULL, "tarefa_realizada" text NOT NULL, "user_id" integer, CONSTRAINT "PK_7a51a0c8a28e402f6ff3b1b67c8" PRIMARY KEY ("id_apt"))`);
        await queryRunner.query(`ALTER TABLE "apontamentos" ADD CONSTRAINT "FK_3c602e045aecdb9f98a675bf638" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apontamentos" DROP CONSTRAINT "FK_3c602e045aecdb9f98a675bf638"`);
        await queryRunner.query(`DROP TABLE "apontamentos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
