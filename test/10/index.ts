import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day10 } from "./../../src/10/day10";
const dayImpl = new Day10();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("13140");
    });
    test('test part 2', () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe(`\
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
    });
});