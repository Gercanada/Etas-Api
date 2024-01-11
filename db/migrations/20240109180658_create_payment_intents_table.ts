import type { Knex } from "knex";
import { isJSDocNullableType } from "typescript";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('payment_intents', table => {
        table.increments('id');
        table.enum('platform', ['stripe', 'converge', 'conekta']);
        table.string('paymentintent_id');

        table.double('amount').notNullable();
        table.double('amount_received');
        table.string('email');
        table.string('name');
        table.string('currency');
        table.string('payment_method_type');
        table.json('payment_method_details');
        table.string('status');
        table.datetime('charge_at');

        table.integer('eta_id').unsigned();
        table.foreign('eta_id').references('id').inTable('etas');

        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('payment_intents');
}

