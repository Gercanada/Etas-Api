import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('etas', table => {
    //   table.date('date_pay');
      table.increments('id').notNullable().primary();
      table.datetime('createdAt').defaultTo(knex.fn.now());
      table.datetime('updatedAt').defaultTo(knex.fn.now());
      table.integer('personal_info_sec_id').unsigned();;
      table.integer('passport_sec_id').unsigned();
      table.integer('user_id').unsigned();
      table.integer('status_ii_sec_id').unsigned();;
      table.integer('travel_to_canada_sec_id').unsigned();;
      table.string('eta_name', 200);
      table.tinyint('questions_are_completed').defaultTo('0');
      table.tinyint('eta_completed').defaultTo('0');
      table.string('documents');
      table.tinyint('needs_documents').defaultTo('0');
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('personal_info_sec_id').references('id').inTable('personal_info_sec');
      table.foreign('passport_sec_id').references('id').inTable('passport_sec');
      table.foreign('status_ii_sec_id').references('id').inTable('status_ii_sec');
      table.foreign('travel_to_canada_sec_id').references('id').inTable('travel_to_canada_sec');
    });
  }

  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('etas');
  }
  
  
