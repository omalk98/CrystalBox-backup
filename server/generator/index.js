import generateUsers from './modules/generateUsers.js';

const count = parseInt(process.argv[2], 10);

if (!count) {
  console.error('Please provide a number of users to generate');
  process.exit(1);
}

generateUsers(count);
