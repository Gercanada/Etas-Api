import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('occupation_picklist', table => {
        table.increments('id').notNullable().primary();
        table.string('value');
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
      });

      await knex('occupation_picklist').insert([
        { value: 'Student' },
        { value: 'Homemaker' },
        { value: 'Retired' },
        { value: 'Occupations in art, culture, recreation, and sport' },
        { value: 'Occupations in business, finance, and administration' },
        { value: 'Occupations in education, law, social, community, and government services' },
        { value: 'Health occupations' },
        { value: 'Management occupations' },
        { value: 'Occupations in manufacturing and utilities' },
        { value: 'Natural and applied sciences and related occupations' },
        { value: 'Occupations in natural resources, agriculture, and related production' },
        { value: 'Sales and service occupations' },
        { value: 'Trades, transport and equipment operators and related occupations' },
        { value: 'Occupations in the armed forces' }
      ]);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('occupation_picklist');
}

