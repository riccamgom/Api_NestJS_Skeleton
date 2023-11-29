import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log(
  '\x1b[33m%s\x1b[0m',
  '*********************************WARNING************************************',
);
console.log(
  '\x1b[31m%s\x1b[0m',
  '**THIS E2E TEST ARE GOING TO WRITE AND DELETE FROM DE DB**',
);
rl.question('¿Are you sure? (y/n) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    console.log('Executing...');
    process.exit(0); // Exit with success status
  } else {
    console.log('Cancel, you will se an ELIFECYCLE error');
    process.exit(1); // Exit with error status, it shows ELIFECYCLE error
  }
});
