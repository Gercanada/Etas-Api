import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('etas', table => {
    //   table.date('date_pay');
      table.increments('id').notNullable();
      table.datetime('createdAt').defaultTo(knex.fn.now());
      table.datetime('updatedAt').defaultTo(knex.fn.now());
      table.integer('personalInfoSec_id').notNullable();
      table.integer('passportSec_id').notNullable();
      table.integer('statusIISec_id').notNullable();
      table.integer('travelToCanadaSec_id').notNullable();
      table.string('eta_name', 200);
      table.tinyint('isCompleted').defaultTo('0');
      table.foreign('personalInfoSec_id').references('id').inTable('personalinfosec');
      table.foreign('passportSec_id').references('id').inTable('passportsec');
      table.foreign('statusIISec_id').references('id').inTable('statusii');
      table.foreign('travelToCanadaSec_id').references('id').inTable('traveltocanada');
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('etas');
  }