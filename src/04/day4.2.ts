import * as fs from 'fs';

// Format: <number>-<number>
console.log(
    fs.readFileSync('data/day4.txt', 'utf-8')
        .split(/\n/)
        .filter((line) => /\d+-\d+,\d+-\d+/.test(line))
        .map(x => x.split(',').map(y => y.split('-').map(z => +z)))
        // check if range 1 and range 2 overlap
        .filter(([[a1, a2], [b1, b2]]) => (a1 <= b1 && a2 >= b1) || (b1 <= a1 && b2 >= a1))
        .length
);