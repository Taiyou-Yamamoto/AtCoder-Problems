const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.trim().split('\n');

const [A, B, W] = lines[0].split(' ').map(Number);

const upper = Math.floor((W * 1000) / A);
const lower = Math.ceil((W * 1000) / B);

if (upper < lower) {
    console.log('UNSATISFIABLE');
} else {
    console.log(`${lower} ${upper}`);
}
