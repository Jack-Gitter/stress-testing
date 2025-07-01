import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoatInit1751392916138 implements MigrationInterface {
  name = 'BoatInit1751392916138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."boat_condition_enum" AS ENUM('NEW', 'MINIMAL_WEAR', 'USED', 'DAMAGED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "boat" ("price" integer NOT NULL, "top_speed_in_knots" integer NOT NULL, "capacity" integer NOT NULL, "name" character varying NOT NULL, "condition" "public"."boat_condition_enum" NOT NULL, "currentlyRented" boolean NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_df74bc7e4d52aaf2f1ff0f4d1ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "boat"`);
    await queryRunner.query(`DROP TYPE "public"."boat_condition_enum"`);
  }
}
