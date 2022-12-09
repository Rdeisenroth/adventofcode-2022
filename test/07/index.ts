import { Day7 } from "./../../src/07/day7";
import path from 'path';
const day7 = new Day7();
day7.inputPath = `data_test/day${day7.day}.txt`

describe('testing day 5', () => {
    test('test part 1', () => {
        const result = day7.part1(day7.input);
        expect(result).toBe("95437");
    });
    test('test part 2', () => {
        const result = day7.part2(day7.input);
        expect(result).toBe("24933642");
    });
});