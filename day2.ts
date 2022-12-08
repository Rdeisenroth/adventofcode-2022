import * as fs from 'fs';

interface move {
    name: string;
    letters: string[];
    points: number;
    winsAgainst: string[];
}

const moves: move[] = [
    {
        name: 'rock',
        letters: ['A', 'X'],
        points: 1,
        winsAgainst: ['scissors']
    },
    {
        name: 'paper',
        letters: ['B', 'Y'],
        points: 2,
        winsAgainst: ['rock']
    },
    {
        name: 'scissors',
        letters: ['C', 'Z'],
        points: 3,
        winsAgainst: ['paper']
    }
];

/* Format:
A Y
B X
C Z
*/

// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
console.log(
    fs.readFileSync('data/day2.txt', 'utf8')
        .split(/\n/)
        .filter((line) => /[A-C] [X-Z]/.test(line))
        .map(x => x.split(' ').map(y => moves.find(z => z.letters.includes(y))!))
        .map(([enemyMove, playerMove]) => {
            return playerMove.points + (playerMove.winsAgainst.includes(enemyMove.name) ? 6 : playerMove.name === enemyMove.name ? 3 : 0);
        })
        .reduce((a, b) => a + b)
);