import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('marital_picklist', table => {
        table.increments('id').primary().notNullable();
        table.string('value');
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });

      await knex('marital_picklist').insert([
        { value: 'Married' },
        { value: 'Single' },
        { value: 'Divorced' }
      ]);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('marital_picklist');
}