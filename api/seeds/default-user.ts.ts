import { Knex } from 'knex';
import { generateUser } from '../test/generateUser';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    await generateUser({ username: 'username' }, 'password'),
  ]);
}
