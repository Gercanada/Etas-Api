import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('gender_picklist', table => {
        table.increments('id').primary().notNullable();
        table.string('value');
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });

      await knex('gender_picklist').insert([
        { value: 'Female' },
        { value: 'Male' }
      ]);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('gender_picklist');
}

