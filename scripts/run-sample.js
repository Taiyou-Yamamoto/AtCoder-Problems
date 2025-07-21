// scripts/run-sample.js
const { execSync } = require('child_process');

const [number, problem, sampleNum = '1'] = process.argv.slice(2); // ["350", "a", "1"]

if (!number || !problem) {
  console.error('Usage: npm run log -- <number> <problem> [sampleNum]');
  process.exit(1);
}

const contest = `abc${number}`;
const inputPath = `${contest}/${problem}/tests/sample-${sampleNum}.in`;
const execPath = `${contest}/${problem}/main.js`;

console.log(`📦 Running ${execPath} with input ${inputPath}...\n`);

try {
  execSync(`node ${execPath} < ${inputPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error:', error.message);
}
