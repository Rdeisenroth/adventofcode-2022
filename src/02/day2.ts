import * as fs from 'fs';
import { AdventOfCodeDay } from '../util/util';

interface move {
    name: string;
    letters: string[];
    points: number;
    winsAgainst: string[];
}

const moves: move[] = [
    { name: 'rock', letters: ['A', 'X'], points: 1, winsAgainst: ['scissors'] },
    { name: 'paper', letters: ['B', 'Y'], points: 2, winsAgainst: ['rock'] },
    { name: 'scissors', letters: ['C', 'Z'], points: 3, winsAgainst: ['paper'] }
];

enum strategy {
    LOOSE = "X",
    DRAW = "Y",
    WIN = "Z"
}

export class Day2 extends AdventOfCodeDay {
    day = 2;
    part1(input: string): string {
        /* Format:
        A Y
        B X
        C Z
        */

        // The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
        return input
            .split(/\n/)
            .filter((line) => /[A-C] [X-Z]/.test(line))
            .map(x => x.split(' ').map(y => moves.find(z => z.letters.includes(y))!))
            .map(([enemyMove, playerMove]) => {
                return playerMove.points + (playerMove.winsAgainst.includes(enemyMove.name) ? 6 : playerMove.name === enemyMove.name ? 3 : 0);
            })
            .reduce((a, b) => a + b).toString();
    }
    part2(input: string): string {
        return input
            .split(/\n/)
            .filter((line) => /[A-C] [X-Z]/.test(line))
            .map(x => x.split(' '))
            .map(([enemyMoveString, playerStrategyString]) => {
                const enemyMove = moves.find(z => z.letters.includes(enemyMoveString))!;

                // calculate player move
                var playerMove = enemyMove;
                if (playerStrategyString === strategy.LOOSE) {
                    playerMove = moves.find(x => enemyMove.winsAgainst.includes(x.name))!;
                } else if (playerStrategyString === strategy.WIN) {
                    playerMove = moves.find(x => x.winsAgainst.includes(enemyMove.name))!;
                }

                // console.log(`Choosing ${playerMove.name} against ${enemyMove.name} with strategy ${playerStrategyString}`);

                return playerMove.points + (playerMove.winsAgainst.includes(enemyMove.name) ? 6 : playerMove.name === enemyMove.name ? 3 : 0);
            })
            .reduce((a, b) => a + b).toString();
    }

    part2Short(input: string): string {
        return input.split(/\n/)
            .map(x => [[0, 65], [2, 88]].map(i => x.charCodeAt(i[0]) - i[1]))
            .map(([a, b]) => (3 + (a + b - 1)) % 3 + 1 + b * 3)
            .reduce((a, b) => a + b).toString();
    }
}

new Day2().run();