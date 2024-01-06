import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('anexample', table => {
        table.increments('id');
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('anexample');
}

