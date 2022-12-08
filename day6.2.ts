import * as fs from 'fs';

// Find first character where the last 4 characters are different
var text = fs.readFileSync('data/day6.txt', 'utf-8').split('');
console.log(text.findIndex((char, i) => i > 3 && new Set(text.slice(i - 13, i+1)).size === 14)+1);