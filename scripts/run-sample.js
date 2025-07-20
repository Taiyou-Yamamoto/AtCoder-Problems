// run.js
const { execSync } = require('child_process');

const [contest, problem, sampleNum = '1'] = process.argv.slice(2); // 例: ["abc350", "a"]

if (!contest || !problem) {
  console.error('Usage: npm run log -- <contest> <problem> [sampleNum]');
  process.exit(1);
}

const inputPath = `${contest}/${problem}/tests/sample-${sampleNum}.in`;
const execPath = `${contest}/${problem}/main.js`;

console.log(`📦 Running ${execPath} with input ${inputPath}...\n`);

try {
  execSync(`node ${execPath} < ${inputPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error:', error.message);
}
