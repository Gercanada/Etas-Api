import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('assistants', table => {
        table.increments('id').notNullable().primary();
        table.string('name').nullable();
        table.string('system_message').nullable();
        table.string('model').defaultTo('llama3-8b-8192');
        table.float('temperature').defaultTo(0.5);
        table.integer('max_tokens').defaultTo(1024);
        table.float('top_p').defaultTo(1);
        table.string('stop').nullable();
        table.boolean('stream').defaultTo(false);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
}

