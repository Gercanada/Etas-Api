import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('social_media_picklist', table => {
        table.increments('id').primary().notNullable();
        table.string('value');
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });

      await knex('social_media_picklist').insert([
        { value: 'Facebook' },
        { value: 'Instagram'},
        { value: 'Linkedin'},
        { value: 'X'},
        { value: 'Other' },
      ]);
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('social_media_picklist');
}

