import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('personal_info_sec', table => {
          table.increments('id').primary().notNullable();
          table.datetime('createdAt').defaultTo(knex.fn.now());
          table.datetime('updatedAt').defaultTo(knex.fn.now());
          table.string('full_name');
          table.datetime('birthday');
          table.integer('city_of_birth');
          table.integer('section').defaultTo(0);
          table.integer('country_of_birth');
          table.string('email');
          table.string('phone');
          table.tinyint('is_completed').defaultTo(0);
          table.integer('gender_id').unsigned();
          table.foreign('gender_id').references('id').inTable('gender_picklist')
        });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('personal_info_sec');
  }

