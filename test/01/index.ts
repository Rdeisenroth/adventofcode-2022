import { Day1 } from "./../../src/01/day1";
const dayImpl = new Day1();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("24000");
    });
    test('test part 2', () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("45000");
    });
});