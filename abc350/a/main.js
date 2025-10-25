const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const numStr = lines[0].slice(3);
const num = parseInt(numStr, 10);

if (lines[0].startsWith('ABC') && num < 350) {
  console.log('Yes');
} else {
  console.log('No');
}