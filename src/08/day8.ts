import { AdventOfCodeDay } from "../util/util";

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
interface directionVector {
    x: number;
    y: number;
    dir: Direction;
}
const directions:directionVector[] = [
    { x: 0, y: -1, dir: Direction.UP },
    { x: 0, y: 1, dir: Direction.DOWN },
    { x: -1, y: 0, dir: Direction.LEFT },
    { x: 1, y: 0, dir: Direction.RIGHT }
]
export class Day8 extends AdventOfCodeDay{
    day = 8;
    private isInBounds(x:number, y:number, grid:number[][]):boolean {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }
    private isAtEdge(x:number, y:number, grid:number[][]):boolean {
        return x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1;
    }
    isVisible(x:number, y:number, grid:number[][]):boolean {
        if(this.isAtEdge(x, y, grid)) {
            return true;
        }
        // a tree is visible from any direction if the combined height of all trees in the way is less than the height of the tree
        const height = grid[y][x];
        // for each direction, check if there is a tree in the way
        dirloop: for (const dir of directions) {
            let x1 = x + dir.x;
            let y1 = y + dir.y;
            while (this.isInBounds(x1, y1, grid)) {
                if(grid[y1][x1] >= height) {
                    continue dirloop;
                }
                x1 += dir.x;
                y1 += dir.y;
            }
            return true;
        }
        return false;
    }
    visibilityMap(input: string): boolean[][] {
        // input is a grid, where each number represents the tree height at that point
        var grid: number[][] = input.split(/\n/).map(x => x.split('').map(y => +y));
        // for each point, check if it is visible from any direction
        var visibilityMap = grid.map((row, y) => row.map((col, x) => this.isVisible(x, y, grid)));
        return visibilityMap;
    }
    visibleCoordinates(visibilityMap: boolean[][]){
        var visibleCoordinates: { x: number, y: number }[] = [];
        for (let y = 0; y < visibilityMap.length; y++) {
            for (let x = 0; x < visibilityMap[y].length; x++) {
                if (x === 0 || x === visibilityMap[y].length - 1 || y === 0 || y === visibilityMap.length - 1) {
                    continue;
                }
                if (visibilityMap[y][x]) {
                    visibleCoordinates.push({ x, y });
                }
            }
        }
        return visibleCoordinates;
    }
    scenicScore(x:number, y:number,grid:number[][]){
        var height = grid[y][x];
        var distances = [] as number[];
        for (const dir of directions) {
            var distance = 0;
            let x1 = x + dir.x;
            let y1 = y + dir.y;
            while (this.isInBounds(x1, y1, grid)) {
                distance++;
                if(grid[y1][x1] >= height) {
                    break;
                }
                x1 += dir.x;
                y1 += dir.y;
            }
            distances.push(distance);
        }
        return distances.reduce((a, b) => a * b, 1);
    }
    part1(input: string): string {
        var visibilityMap = this.visibilityMap(input);
        console.log(visibilityMap);
        var visibleCoordinates = this.visibleCoordinates(visibilityMap);
        console.log(visibleCoordinates);
        return visibilityMap.reduce((a, b) => a + +b.reduce((c, d) => c + +d, 0), 0).toString();
    }
    part2(input: string): string {
        // find the tree with the highest scenic score
        var grid: number[][] = input.split(/\n/).map(x => x.split('').map(y => +y));
        return grid.map((row, y) => row.map((col, x) => this.scenicScore(x, y, grid))).reduce((a, b) => a.concat(b)).reduce((a, b) => Math.max(a, b)).toString();
    }

}

new Day8().run();