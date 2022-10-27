import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666895205709 implements MigrationInterface {
    name = 'default1666895205709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apontamentos" RENAME COLUMN "tarefa_realiza" TO "tarefa_realizada"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b4f334ce4e8924c3560dd4ba1d6" UNIQUE ("nome")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_b4f334ce4e8924c3560dd4ba1d6"`);
        await queryRunner.query(`ALTER TABLE "apontamentos" RENAME COLUMN "tarefa_realizada" TO "tarefa_realiza"`);
    }

}
