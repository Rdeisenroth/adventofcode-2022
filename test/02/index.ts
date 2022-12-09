import { Day2 } from "../../src/02/day2";
const dayImpl = new Day2();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("15");
    });
    test('test part 2', () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("12");
    });
    test('test short part 2', () => {
        const result = dayImpl.part2Short(dayImpl.input);
        expect(result).toBe("12");
    });
});