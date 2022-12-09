import * as fs from 'fs';


// Format:
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2
var stacks:string[][] = []
let [stackString, moves] = fs.readFileSync('data/day5.txt', 'utf-8')
    .split(/\n\n/)
    .map(x => x.split(/\n/));
const stackFormat = stackString.pop()!;
[...stackFormat.matchAll(/\d/g)].forEach((stack, i) => {
    const stackPosition = stack.index!;
    stackString.forEach((line) => {
        // console.log(`stackPosition: ${stackPosition}, line: ${line}`);
        const stackValue = line[stackPosition];
        if (stackValue !== ' ') {
            stacks[i] = stacks[i] || [];
            stacks[i].push(stackValue);
        }
    });
});

// do moves
moves.forEach((move) => {
    var matches = /move (?<countStr>\d+) from (?<fromStr>\d+) to (?<toStr>\d+)/.exec(move);
    if(!matches?.groups) return;
    const {countStr, fromStr, toStr} = matches.groups;
    const count = +countStr;
    const from = +fromStr;
    const to = +toStr;
    console.log(`move ${count} from ${from} to ${to}`);
    // remove the first count elements from stack[from-1]
    const values = stacks[from-1].splice(0, count).reverse();
    console.log(`values: ${values}`);
    // add to the new stack on first position
    stacks[to-1].unshift(...values);
    console.log(
            stacks
    );
});
console.log(stacks.map(x => x[0]).join(''));