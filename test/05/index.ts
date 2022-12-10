import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day5 } from "./../../src/05/day5";
const dayImpl = new Day5();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("CMZ");
    });
    test('test part 2', () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("MCD");
    });
});