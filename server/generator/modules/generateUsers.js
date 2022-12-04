import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import fs from 'fs';

let data = {};
const users = [];
const user_details = [];

const admin = {
  user: {
    _id: 'pd4d3a5a-022c-4cfc-b7f0-9385751j751',
    username: 'Black-Pearl',
    email: 'johnny-pirate@email.com',
    roles: ['ADMIN'],
    date_joined: '2022-02-15T15:26:54.699Z',
    last_login: { time: '2022-10-26T07:55:20.630Z', ip: '172.24.66.87' },
    status: { locked: false, activated: true }
  },
  details: {
    first_name: 'Johnny',
    last_name: 'Depp',
    date_of_birth: '1973-01-01',
    phone: '1234567890',
    address: {
      street: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postal_code: 'M4J 2J2',
      country: 'Canada'
    },
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.B27pKcCURGvnUkNYXDsrYAHaGv%26pid%3DApi&f=1'
  }
};
const test = {
  user: {
    _id: 'ad926d2e-3a29-4c5d-b3f2-be1592bbc28f',
    username: 'test',
    email: 'testerman360@mail.com',
    roles: ['ADMIN', 'USER'],
    status: { locked: false, activated: true },
    date_joined: '2022-02-15T15:26:54.699Z',
    last_login: { time: '2022-10-26T07:55:20.630Z', ip: '172.24.256.19' }
  },
  details: {
    first_name: 'Test',
    last_name: 'User',
    date_of_birth: '1944-03-23',
    phone: '5600136450',
    address: {
      street: '48676 Leannon Heights',
      city: 'Oakville',
      province: 'NL',
      postal_code: 'N1L 4F0',
      country: 'Canada'
    },
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-SoGTBd7HzjI%2FWdcp86FaBdI%2FAAAAAAAArlg%2FV_WFAjBSG0ghaFI3HFf5BcvwUr1OG4zdwCLcBGAs%2Fs1600%2Fpopeyes_mom.jpeg&f=1&nofb=1&ipt=fc232eda3d953c4edee3159e1cca18e85382de98aff72161991112d079e75094&ipo=images'
  }
};

users.push(admin.user);
user_details.push(admin.details);
users.push(test.user);
user_details.push(test.details);

const provinces = ['ON', 'BC', 'QC', 'AB', 'NS', 'NB', 'MB', 'PE', 'SK', 'NL'];

export default function generateUsers(count) {
  for (let i = 0; i < count; i += 1) {
    faker.locale = 'en_CA';
    const id = crypto.randomUUID();
    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    const user = {
      _id: id,
      username: `${fname[0].toLocaleLowerCase()}.${lname.toLocaleLowerCase()}${faker.random.numeric(
        5,
        { allowLeadingZeros: true }
      )}`,
      email: faker.internet.email(fname, lname),
      roles: ['USER'],
      date_joined: faker.date.past().toISOString(),
      last_login: {
        time: faker.date.recent().toISOString(),
        ip: faker.internet.ip()
      },
      status: {
        locked: !!faker.random.numeric() % 2,
        activated: !!faker.random.numeric() % 2
      }
    };
    const details = {
      _id: id,
      first_name: fname,
      last_name: lname,
      date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
      phone: faker.phone.number('##########'),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.cityName(),
        province: provinces[faker.random.numeric()],
        postal_code: faker.address.zipCode('?#? #?#'),
        country: 'Canada'
      },
      image: faker.image.avatar()
    };
    users.push(user);
    user_details.push(details);
    data = { users, user_details };
  }
  fs.writeFileSync('./data/user-data.json', JSON.stringify(data));
}
