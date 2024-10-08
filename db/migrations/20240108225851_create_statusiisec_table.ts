import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('status_ii_sec', table => {
        table.increments('id').notNullable().primary();
        table.string('country_residence');
        table.string('address');
        table.string('zip_code');
        table.string('state');
        table.integer('occupation_id').unsigned();;
        table.string('job_location');
        table.string('company_name');
        table.integer('section').defaultTo(2);
        table.string('worked_time');
        table.boolean('is_completed').defaultTo(0);
        table.boolean('permit_for_canada').defaultTo(0);
        table.foreign('occupation_id').references('id').inTable('occupation_picklist')
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('status_ii_sec');
}

