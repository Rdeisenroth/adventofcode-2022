import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day9 } from "./../../src/09/day9";
const dayImpl = new Day9();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("13");
    });
    test('test part 2', () => {
        dayImpl.inputPath = `data_test/day${dayImpl.day}_2.txt`
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("36");
    });
});