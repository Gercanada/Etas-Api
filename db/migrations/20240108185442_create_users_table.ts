
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments("id").primary().notNullable(),
        table.string("first_name"),
        table.string("last_name"),
        table.integer("pending_etas"),
        table.integer("completed_etas"),
        table.string("email"),
        table.string("password"),
        table.integer("etas_num"),
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

