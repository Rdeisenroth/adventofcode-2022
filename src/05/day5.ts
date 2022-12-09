import * as fs from 'fs';
import { AdventOfCodeDay } from '../util/util';

export class Day5 extends AdventOfCodeDay {
    day = 5;
    getStacks(stackString:string[]): string[][] {
        var stacks: string[][] = [];
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
        return stacks;
    }
    doMoves(moves:string[], stacks:string[][], keepOrder:boolean = false):string[][] {
        moves.forEach((move) => {
            var matches = /move (?<countStr>\d+) from (?<fromStr>\d+) to (?<toStr>\d+)/.exec(move);
            if (!matches?.groups) return;
            const { countStr, fromStr, toStr } = matches.groups;
            const count = +countStr;
            const from = +fromStr;
            const to = +toStr;
            console.log(`move ${count} from ${from} to ${to}`);
            // remove the first count elements from stack[from-1]
            var values = stacks[from - 1].splice(0, count);
            if(!keepOrder) values = values.reverse();
            console.log(`values: ${values}`);
            // add to the new stack on first position
            stacks[to - 1].unshift(...values);
        });
        return stacks;
    }
    part1(input: string): string {
        // Format:
        //     [D]    
        // [N] [C]    
        // [Z] [M] [P]
        //  1   2   3 

        // move 1 from 2 to 1
        // move 3 from 1 to 3
        // move 2 from 2 to 1
        // move 1 from 1 to 2
        var stacks: string[][] = []
        let [stackString, moves] = input
            .split(/\n\n/)
            .map(x => x.split(/\n/));
        stacks = this.getStacks(stackString);
        stacks = this.doMoves(moves, stacks);
        return stacks.map(x => x[0]).join('');
    }
    part2(input: string): string {
        var stacks: string[][] = []
        let [stackString, moves] = input
            .split(/\n\n/)
            .map(x => x.split(/\n/));
        stacks = this.getStacks(stackString);
        stacks = this.doMoves(moves, stacks, true);
        return stacks.map(x => x[0]).join('');
    }

}

new Day5().run();