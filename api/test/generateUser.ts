import { faker } from '@faker-js/faker';
import { v4 as createId } from 'uuid';
import { User, hashPassword } from '../src/app.service';

export const generateUser = async (
  overrides: Partial<User> = {},
  password = 'password',
): Promise<User> => {
  const [hash, salt] = await hashPassword(password, 10);

  return {
    id: createId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hash,
    salt,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  };
};
