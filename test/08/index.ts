import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day8 } from "./../../src/08/day8";
const dayImpl = new Day8();
dayImpl.inputPath = `data_test/day${dayImpl.day}.txt`

describe(`testing day ${dayImpl.day}`, () => {
    test('test visibile coordinates', () => {
        const result = dayImpl.visibleCoordinates(dayImpl.visibilityMap(dayImpl.input));
        expect(result).toContainEqual({x: 1, y: 1});
        expect(result).toContainEqual({x: 2, y: 1});
        expect(result).toContainEqual({x: 1, y: 2});
        expect(result).toContainEqual({x: 3, y: 2});
        expect(result).toContainEqual({x: 2, y: 3});
        expect(result).toEqual([
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 1, y: 2},
            {x: 3, y: 2},
            {x: 2, y: 3},
        ]);
    });
    test('test part 1', () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("21");
    });
    test('test part 2', () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("8");
    });
});