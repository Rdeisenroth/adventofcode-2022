import { AdventOfCodeDay } from "../util/util"

export class Day1 extends AdventOfCodeDay {
        day = 1;
        part1(input: string): string {
                return input
                                .split(/\n\n/)
                                .map(x => x.split(/\n/).map(y => +y).reduce((x, y) => x + y))
                                .sort((a, b) => b - a)[0].toString()
                ;
        }
        part2(input: string): string {
                return input
                                .split(/\n\n/)
                                .map(x => x.split(/\n/).map(y => +y).reduce((x, y) => x + y))
                                .sort((a, b) => b - a)
                                .slice(0, 3)
                                .reduce((x, y) => x + y).toString();
        }

}

new Day1().run();