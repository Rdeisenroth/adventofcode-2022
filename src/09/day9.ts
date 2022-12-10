import { directions8, getDirectionFromLetter, getDirectionVectorFromLetter, range } from "./../util/util";
import { AdventOfCodeDay, Direction, directions } from "../util/util";
import * as _ from 'lodash';

interface Knot {
    position: { x: number, y: number };
    visitedPositions: { x: number, y: number }[];
}
interface GameState {
    knots: Knot[];
}
export class Day9 extends AdventOfCodeDay {
    day = 9;
    moveHead(state: GameState, directionVector: {x:number,y:number}): void {
        const head = state.knots[0];
        const tail = state.knots[state.knots.length-1];
        tail.visitedPositions.push({...tail.position});
        head.position.x += directionVector.x;
        head.position.y += directionVector.y;

        // move all other knots
        for(let i = 1; i < state.knots.length; i++) {
            const knot = state.knots[i];
            const prevKnot = state.knots[i-1];
            if (_.isEqual(knot.position, prevKnot.position)) {
                break;
            }
            // find optimal direction to move tail
            const tailMovement = _.minBy(
                directions8.map(d => ({ x: knot.position.x + d.x, y: knot.position.y + d.y })),
                p => Math.abs(p.x - prevKnot.position.x) + Math.abs(p.y - prevKnot.position.y)
            )!;
    
            if(_.isEqual(tailMovement, prevKnot.position)) {
                break;
            }
            knot.position.x = tailMovement.x;
            knot.position.y = tailMovement.y;
        }



        tail.visitedPositions.push({...tail.position});
    }
    part1(input: string): string {
        const movements = input.split(/\n/).map(l => l.split(/ /))
        .map(l => ({ direction: getDirectionVectorFromLetter(l[0]), distance: +l[1] }));
        const state: GameState = {
            knots: [{
                position: { x: 0, y: 0 },
                visitedPositions: []
            },
            {
                position: { x: 0, y: 0 },
                visitedPositions: []
            }]
        };
        movements.forEach((m,i) => {
            // console.log(`Move ${i}/${movements.length}: ${m.direction.dir} ${m.distance}`);
            range(0, m.distance).forEach(() => this.moveHead(state, m.direction));
        });

        // get unique visited tail positions
        state.knots[1].visitedPositions = _.uniqBy(state.knots[1].visitedPositions, p => `${p.x},${p.y}`);

        // console.log(`visited Positions: ${[...state.knots[1].visitedPositions].map(x => `(${x.x},${x.y})`).join(', ')}`);
        return state.knots[1].visitedPositions.length.toString();
    }
    part2(input: string): string {
        const movements = input.split(/\n/).map(l => l.split(/ /))
            .map(l => ({ direction: getDirectionVectorFromLetter(l[0]), distance: +l[1] }));
        // rope with 1000 knots
        const state: GameState = {
            knots: range(0, 10).map(i => ({
                position: { x: 0, y: 0 },
                visitedPositions: []
            }))
        };
        movements.forEach((m, i) => {
            // console.log(`Move ${i}/${movements.length}: ${m.direction.dir} ${m.distance}`);
            range(0, m.distance).forEach(() => this.moveHead(state, m.direction));
        });

        // get unique visited tail positions
        state.knots[state.knots.length-1].visitedPositions = _.uniqBy(state.knots[state.knots.length-1].visitedPositions, p => `${p.x},${p.y}`);

        // console.log(`visited Positions: ${[...state.knots[1].visitedPositions].map(x => `(${x.x},${x.y})`).join(', ')}`);
        return state.knots[state.knots.length - 1].visitedPositions.length.toString();
    }
}

new Day9().run();