const { execSync } = require('child_process');
const path = require('path');

const [contestNum, problemAlpha] = process.argv.slice(2);
if (!contestNum || !problemAlpha) {
  console.error('Usage: npm run submit -- <contestNum> <problemAlpha>');
  process.exit(1);
}

const contestId = `abc${contestNum}`;
const problemId = `${contestId}_${problemAlpha}`;
const url = `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
const filePath = path.resolve(`${contestId}/${problemAlpha}/main.js`);
const cookiePath = path.resolve('my_cookie.txt');
const langId = '5028';
const ojPath = '/opt/anaconda3/bin/oj'; // 👈 ここがポイント！

console.log(`🚀 Submitting ${filePath} to ${url}...\n`);

try {
  execSync(`${ojPath} -c ${cookiePath} submit ${url} ${filePath} --language ${langId}`, { stdio: 'inherit' });
} catch (err) {
  console.error('\n❌ Submission failed:', err.message);
}
