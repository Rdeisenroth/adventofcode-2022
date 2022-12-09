import { Day1 } from "./../../src/01/day1";
import path from 'path';
const day1 = new Day1();
day1.inputPath = `data_test/day${day1.day}.txt`

describe('testing day 5', () => {
    test('test part 1', () => {
        const result = day1.part1(day1.input);
        expect(result).toBe("24000");
    });
    test('test part 2', () => {
        const result = day1.part2(day1.input);
        expect(result).toBe("45000");
    });
});