import * as fs from 'fs';

// const moves = [
//     { name: 'rock', letters: ['A'], points: 1, winsAgainst: ['scissors'] },
//     { name: 'paper', letters: ['B'], points: 2, winsAgainst: ['rock'] },
//     { name: 'scissors', letters: ['C'], points: 3, winsAgainst: ['paper'] }
// ];

// enum strategy {
//     LOOSE = "X",
//     DRAW = "Y",
//     WIN = "Z"
// }

// console.log(
//     fs.readFileSync('data/day2.txt', 'utf8')
//         .split(/\n/)
//         .filter((line) => /[A-C] [X-Z]/.test(line))
//         .map(x => x.split(' '))
//         .map(([enemyMoveString, playerStrategyString]) => {
//             const enemyMove = moves.find(z => z.letters.includes(enemyMoveString))!;

//             // calculate player move
//             var playerMove = enemyMove;
//             if (playerStrategyString === strategy.LOOSE) {
//                 playerMove = moves.find(x => enemyMove.winsAgainst.includes(x.name))!;
//             } else if (playerStrategyString === strategy.WIN) {
//                 playerMove = moves.find(x => x.winsAgainst.includes(enemyMove.name))!;
//             }

//             // console.log(`Choosing ${playerMove.name} against ${enemyMove.name} with strategy ${playerStrategyString}`);

//             return playerMove.points + (playerMove.winsAgainst.includes(enemyMove.name) ? 6 : playerMove.name === enemyMove.name ? 3 : 0);
//         })
//         .reduce((a, b) => a + b)
// );

console.log(
    console.log(
        fs.readFileSync('data/day2.txt', 'utf-8').split(/\n/).map(x => [[0, 65], [2, 88]].map(i => x.charCodeAt(i[0]) - i[1])).map(([a, b]) => (3 + (a + b - 1)) % 3 + 1 + b * 3).reduce((a, b) => a + b))
);

const d2 = (s:string) => s.split(/\n/)
    .map(x => [[0,65],[2,88]].map(i=>x.charCodeAt(i[0])-i[1]))
    .map(([a, b]) => (3 + (a + b - 1)) % 3 + 1 + b * 3)
    .reduce((a, b) => a + b)

// 10398

const s = "A X"
// map to char code using :: operator
const m = s.split(' ').map(x => x.charCodeAt(0))