import { AdventOfCodeDay } from "../util/util";
import * as _ from 'lodash';

interface Knot {
    position: { x: number, y: number };
    visitedPositions: { x: number, y: number }[];
}
interface GameState {
    knots: Knot[];
}
export class Day10 extends AdventOfCodeDay {
    day = 10;
    part1(input: string): string {
        const instructions = input.split(/\n/);
        var cycles: number[] = [1];
        for (const inst of instructions) {
            const [command, ...args] = inst.split(' ');
            if (command === "noop") {
                cycles.push(cycles[cycles.length - 1]);
            } else {
                cycles.push(cycles[cycles.length - 1]);
                cycles.push(cycles[cycles.length - 1] + (+args[0]));
            }
        }

        return cycles.map((c, i) => [c, i]).filter((_, i) => i >= 19 && (i + 21) % 40 === 0).map(([c, i]) => c * (i + 1)).reduce((x, y) => x + y,0).toString();
    }
    part2(input: string): string {
        const instructions = input.split(/\n/);
        var cycles: number[] = [1];
        for (const inst of instructions) {
            const [command, ...args] = inst.split(' ');
            if (command === "noop") {
                cycles.push(cycles[cycles.length - 1]);
            } else {
                cycles.push(cycles[cycles.length - 1]);
                cycles.push(cycles[cycles.length - 1] + (+args[0]));
            }
        }
        const display_width=40;
        const display_height=6;
        const sprite_width=3;
        const halfSpriteWidth = Math.floor(sprite_width/2);
        const display: boolean[][] = new Array(display_height).fill(undefined).map(_ => new Array(display_width).fill(false));
        for(const [i,c] of cycles.entries()){
            const row = Math.floor(i/display_width) % display_height;
            const col = i%display_width;
            if(col <= c + halfSpriteWidth && col >= c - halfSpriteWidth){
                if(display[row] === undefined || display[row][col] === undefined){
                    throw new Error(`Collision at ${row},${col}`);
                }
                display[row][col] = true;
            }
        }
        return display.map(row => row.map(x => x ? '#' : '.').join('')).join('\n');
    }

}

new Day10().run();