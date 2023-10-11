const { exec } = require('child_process');
const fs = require('fs');

const logFile = fs.createWriteStream('output.log');

const child = exec('npm run start', { stdio: 'pipe' });
child.stdout.pipe(logFile);
child.stderr.pipe(logFile);

child.on('exit', (code, signal) => {
  console.log(`O processo foi finalizado com código ${code} e sinal ${signal}`);
});