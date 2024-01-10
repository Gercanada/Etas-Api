import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('travel_to_canada_sec', table => {
        table.increments('id').notNullable().primary();
        table.string('travel_hour');
        table.string('crime_any_country');
        table.string('travel_propouse');
        table.string('more_info');
        table.boolean('is_completed').defaultTo(0);
        table.boolean('denied_enter_country').defaultTo(0);
        table.boolean('had_tuberculosis').defaultTo(0);
        table.boolean('other').defaultTo(0);
        table.string('other_reason');
        table.boolean('how_contact_us_id').defaultTo(0);
        table.integer('how_contact_us_id').references('id').inTable('social_media_picklist')
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('travel_to_canada_sec');
}

