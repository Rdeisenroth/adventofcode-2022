import * as fs from 'fs';
import * as _ from 'lodash';

// var day3 = (s: string) => _.sum(
//     _.chunk(s.split(/\n/), 3)
//         .map(([a, b, c]) => [...new Set(a)].find(x => b.includes(x) && c.includes(x))!)
//         .map(c => c.charCodeAt(0) - (c.charCodeAt(0) > 96 ? 96 : 38))
// );

var day3 = (s: string) => _.sum(
    _.chunk(s.split(/\n/), 3)
        .map(([a, b, c]) => [...new Set(a)].find(x => b.includes(x) && c.includes(x))!)
        .map(c => c.charCodeAt(0))
        .map(c => c - (c > 96 ? 96 : 38))
);


console.log(day3(fs.readFileSync('data/day3.txt', 'utf-8')));