import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('assistant_histories', table => {
        table.increments('id').notNullable().primary();
        table.text('message').nullable();
        table.integer('assistant_id').unsigned();
        table.foreign('assistant_id').references('id').inTable('assistants');
        table.string('message_type').defaultTo('user'); // Can be 'user' or 'bot'
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('assistant_histories');
}


