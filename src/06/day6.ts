import * as fs from 'fs';
import { AdventOfCodeDay } from '../util/util';

export class Day6 extends AdventOfCodeDay {
    day = 6;
    part1(input: string): string {
        return input.split('').findIndex((char, i) => i > 3 && new Set(input.slice(i - 3, i + 1)).size === 4) + 1 + '';
    }
    part2(input: string): string {
        return input.split('').findIndex((char, i) => i > 3 && new Set(input.slice(i - 13, i + 1)).size === 14) + 1 + '';
    }

}

new Day6().run();