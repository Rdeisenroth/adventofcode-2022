import * as fs from 'fs';
import * as _ from 'lodash';
import { AdventOfCodeDay } from '../util/util';

export class Day3 extends AdventOfCodeDay{
    day = 3;
    // a-z have priority 1-26, A-Z have priority 27-52
    charToPriority = (char: string) => char.charCodeAt(0) - (char.charCodeAt(0) > 96 ? 96 : 38)
    part1(input: string): string {
        // Format: jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        return input
            .split(/\n/)
            // split each line at half
            .map(x => [x.slice(0, x.length / 2), x.slice(x.length / 2)])
            .map(([a, b]) => [...new Set(a)].filter(x => b.includes(x)).map(this.charToPriority).reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b).toString();
    }
    part2(input: string): string {
        return _.sum(
            _.chunk(input.split(/\n/), 3)
                .map(([a, b, c]) => [...new Set(a)].find(x => b.includes(x) && c.includes(x))!)
                .map(c => c.charCodeAt(0))
                .map(c => c - (c > 96 ? 96 : 38))
        ).toString();
    }
}

new Day3().run();