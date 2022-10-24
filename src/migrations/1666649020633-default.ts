import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666649020633 implements MigrationInterface {
    name = 'default1666649020633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id_user" SERIAL NOT NULL, "nome" text NOT NULL, "cargo" text NOT NULL, "email" text NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "apontamentos" ("id_apt" SERIAL NOT NULL, "data_apontamento" TIMESTAMP NOT NULL, "total_horas" integer NOT NULL, "tarefa_realiza" text NOT NULL, "user_id" integer, CONSTRAINT "PK_7a51a0c8a28e402f6ff3b1b67c8" PRIMARY KEY ("id_apt"))`);
        await queryRunner.query(`ALTER TABLE "apontamentos" ADD CONSTRAINT "FK_3c602e045aecdb9f98a675bf638" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apontamentos" DROP CONSTRAINT "FK_3c602e045aecdb9f98a675bf638"`);
        await queryRunner.query(`DROP TABLE "apontamentos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
