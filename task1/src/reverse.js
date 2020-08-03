import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'input> '
});

console.log('type text for processing or \'quit\' to exit');
rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'quit':
      console.log('Have a great day!');
      process.exit(0);
      break;
    default:
      console.log('output> ' + reverse(line));
      break;
  }
  rl.prompt();
});

function reverse(str) {
  return str.split('').reverse().join('');
}
