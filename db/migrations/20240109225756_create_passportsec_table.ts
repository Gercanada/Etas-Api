import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('passport_sec', table => {
        //   table.date('date_pay');
          table.increments('id').notNullable().primary();
          table.datetime('createdAt').defaultTo(knex.fn.now());
          table.datetime('updatedAt').defaultTo(knex.fn.now());
          table.datetime('valid_from');
          table.integer('passport_country');
          table.tinyint('is_completed').defaultTo(0);
          table.tinyint('has_green_card_id').defaultTo(0);
          table.tinyint('citizen_another_country_id').defaultTo(0);
          table.integer('marital_situation_id');
          table.foreign('marital_situation_id').references('id').inTable('marital_situation')
        });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('personalinfosec');
  }
