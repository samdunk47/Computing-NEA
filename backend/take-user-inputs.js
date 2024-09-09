const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a value: ', (input) => {
    const userInput = input;
    console.log('User input:', userInput);
    rl.close();
});


