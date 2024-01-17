import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('attackments', table => {
        table.increments('id').notNullable().primary();
        table.string('type').nullable();
        table.string('name').nullable();
        table.string('path').nullable();

        table.integer('eta_id').unsigned();
        table.foreign('eta_id').references('id').inTable('etas');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('attackments');
}


