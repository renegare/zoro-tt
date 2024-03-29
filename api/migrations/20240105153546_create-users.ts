import type { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').notNullable().primary();
    table.string('username').notNullable();
    table.text('password').notNullable();
    table.text('salt').notNullable();
    table.string('email').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table.dateTime('deletedAt').nullable();

    table.index('username');
    table.index('email');
    table.unique(['email', 'deletedAt']);
    table.unique(['username', 'deletedAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
