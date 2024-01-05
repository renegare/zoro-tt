import type { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').notNullable().primary();
    table.text('username').notNullable();
    table.text('email').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table.dateTime('deletedAt').notNullable();

    table.unique(['email', 'deletedAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
