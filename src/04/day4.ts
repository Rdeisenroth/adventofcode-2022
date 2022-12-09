import * as fs from 'fs';
import { AdventOfCodeDay } from '../util/util';

export class Day4 extends AdventOfCodeDay {
    day = 4;
    part1(input: string): string {
        // Format: <number>-<number>,<number>-<number>
        return input
            .split(/\n/)
            .filter((line) => /\d+-\d+,\d+-\d+/.test(line))
            .map(x => x.split(',').map(y => y.split('-').map(z => +z)))
            // check if range 1 is fully contained in range 2 or vice versa
            .filter(([[a1, a2], [b1, b2]]) => (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2))
            .length.toString();
    }
    part2(input: string): string {
        return input
            .split(/\n/)
            .filter((line) => /\d+-\d+,\d+-\d+/.test(line))
            .map(x => x.split(',').map(y => y.split('-').map(z => +z)))
            // check if range 1 and range 2 overlap
            .filter(([[a1, a2], [b1, b2]]) => (a1 <= b1 && a2 >= b1) || (b1 <= a1 && b2 >= a1))
            .length.toString();
    }

}

new Day4().run();