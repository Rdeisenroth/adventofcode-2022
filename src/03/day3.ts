import * as fs from 'fs';
// a-z have priority 1-26, A-Z have priority 27-52
const charToPriority = (char: string) => char.charCodeAt(0) - (char.charCodeAt(0) > 96 ? 96 : 38);

// Format: jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
console.log(
    fs.readFileSync('data/day3.txt', 'utf-8')
        .split(/\n/)
        // split each line at half
        .map(x => [x.slice(0, x.length / 2), x.slice(x.length / 2)])
        .map(([a, b]) => [...new Set(a)].filter(x => b.includes(x)).map(charToPriority).reduce((a, b) => a + b, 0))
        .reduce((a, b) => a+b)

);