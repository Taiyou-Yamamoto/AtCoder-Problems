const { execSync } = require('child_process');
const path = require('path');

const [number, problem] = process.argv.slice(2);

if (!number || !problem) {
  console.error('❌ Usage: node scripts/download-and-test.js <number> <problem>');
  process.exit(1);
}

const contest = `abc${number}`;
const targetDir = path.join(contest, problem, 'tests');

try {
  execSync(`oj t -d ${targetDir} -c "node ${contest}/${problem}/main.js"`, {
    stdio: 'inherit',
  });

  console.log(`✅ All tests executed.`);
} catch (err) {
  console.error('❌ テストに失敗しました');
  process.exit(1);
}
