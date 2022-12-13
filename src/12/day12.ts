import { AdventOfCodeDay } from "../util/util";
import * as util from 'util';
import * as _ from 'lodash';

export class Day12 extends AdventOfCodeDay {
    day = 12;
    parseInput(input: string): { heightMap: number[][], start: { x: number, y: number }, end: { x: number, y: number } } {
        const lines = input.split(/\r?\n/);
        // a = 0, b = 1, ...,z = 25
        let heightMap: number[][] = [];
        let start: { x: number, y: number } = { x: 0, y: 0 };
        let end: { x: number, y: number } = { x: 0, y: 0 };
        for (const [y, line] of lines.entries()) {
            heightMap[y] = [];
            for (const [x, char] of line.split("").entries()) {
                if (char === "S") {
                    start = { x, y };
                    heightMap[y][x] = 'a'.charCodeAt(0) - 97;
                } else if (char === "E") {
                    end = { x, y };
                    heightMap[y][x] = 'z'.charCodeAt(0) - 97;
                } else {
                    heightMap[y][x] = char.charCodeAt(0) - 97;
                }
            }
        }
        return { heightMap, start, end };
    }
    MinAmountOfStepsFrom(heightMap: number[][], start: { x: number, y: number }, end: { x: number, y: number }): number {
        let queue: { x: number, y: number, steps: number }[] = [{ x: start.x, y: start.y, steps: 0 }];
        let visited: { x: number, y: number }[] = [];
        while (queue.length > 0) {
            const { x, y, steps } = queue.shift()!;
            if (visited.some(v => v.x === x && v.y === y)) {
                continue;
            }
            visited.push({ x, y });
            if (x === end.x && y === end.y) {
                return steps;
            }
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX < 0 || newY < 0 || newX >= heightMap[0].length || newY >= heightMap.length) {
                    continue;
                }
                if (heightMap[newY][newX] <= heightMap[y][x] + 1) {
                    queue.push({ x: newX, y: newY, steps: steps + 1 });
                }
            }
        }
        return -1;
    }
    part1(input: string): string {
        const { heightMap, start, end } = this.parseInput(input);
        // Find the shortest path from start to end, using the height map. 
        //The path can go down an arbitrary amount of steps, but it can only go up 1 step at a time.
        const shortestPath = this.MinAmountOfStepsFrom(heightMap, start, end);
        return shortestPath.toString();
    }
    part2(input: string): string {
        const { heightMap, start, end } = this.parseInput(input);

        // get all positions that have elevation 0
        const positionsWithElevation0: { x: number, y: number }[] = [];
        for (const [y, row] of heightMap.entries()) {
            for (const [x, height] of row.entries()) {
                if (height === 0) {
                    positionsWithElevation0.push({ x, y });
                }
            }
        }
        return positionsWithElevation0
        .map(pos => this.MinAmountOfStepsFrom(heightMap, pos, end))
        .filter(x => x !== -1)
        .reduce((a, b) => Math.min(a, b)).toString();
    }
}

new Day12().run();