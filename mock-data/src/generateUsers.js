import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import fs from 'fs';

const data = [];

const provinces = ['ON', 'BC', 'QC', 'AB', 'NS', 'NB', 'MB', 'PE', 'SK', 'NL'];

export default function generateUsers(count) {
  for (let i = 0; i < count; i++) {
    faker.locale = 'en_CA';
    let fname = faker.name.firstName();
    let lname = faker.name.lastName();
    let item = {
      user_details: {
        first_name: fname,
        last_name: lname,
        username: `${fname[0].toLocaleLowerCase()}.${lname.toLocaleLowerCase()}${faker.random.numeric(
          3,
          { allowLeadingZeros: true }
        )}`,
        email: faker.internet.email(fname, lname)
      },
      security_details: {
        id: crypto.randomUUID(),
        security_level: (faker.random.numeric() % 3) + 1
      },
      personal_details: {
        date_of_birth: faker.date.birthdate().toISOString().split('T')[0],
        phone: faker.phone.number('##########'),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.cityName(),
          province: provinces[faker.random.numeric()],
          postal_code: faker.address.zipCode('?#? #?#'),
          country: 'Canada'
        }
      },
      server_details: {
        roles: ['USER'],
        status: {
          locked: faker.random.numeric() % 2 ? true : false,
          activated: faker.random.numeric() % 2 ? true : false
        },
        date_joined: faker.date.past().toISOString(),
        date_last_login: faker.date.recent().toISOString()
      },
      user_image: faker.image.avatar()
    };
    data.push(item);
  }
  fs.writeFileSync('./data/user-data.json', JSON.stringify(data));
}
