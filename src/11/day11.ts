import { AdventOfCodeDay } from "../util/util";
import * as util from 'util';
import * as _ from 'lodash';
class Monkey {
    constructor(public items: number[],
        public operation: (old: number) => number,
        public testDevisableByNumber: number,
        public recieverIfTrue: number,
        public recieverIfFalse: number) { 
            this.maxModulo = this.testDevisableByNumber;
        }
    private _inspectionCount = 0;
    public maxModulo:number;
    public inspectItem(item: number, divideByThree=true): { newItem: number, nextMonkeyId: number } {
        this._inspectionCount++;
        // remove item from items
        item = this.operation(item);
        if(divideByThree){
            item = Math.floor(item / 3);
        }
        return { 
            newItem: item % this.maxModulo,
            nextMonkeyId: item % this.testDevisableByNumber === 0 ? this.recieverIfTrue : this.recieverIfFalse 
        };
    }
    get inspectionCount(): number {
        return this._inspectionCount;
    }
}
export class Day11 extends AdventOfCodeDay {
    day = 11;

    parseMonkey(input: string[]): Monkey {
        // --Format--
        // Monkey 0:
        // Starting items: 79, 98
        // Operation: new = old * 19
        // Test: divisible by 23
        //   If true: throw to monkey 2
        //   If false: throw to monkey 3

        let starting_items_line = input.shift()!;
        let operation_line = input.shift()!;
        let divisable_by_line = input.shift()!;
        let if_true_line = input.shift()!;
        let if_false_line = input.shift()!;

        const monkey = new Monkey(
            starting_items_line.match(/\d+/g)!.map(x => parseInt(x)),
            (old: number) => eval(operation_line.split("new = ")[1].replace("old", old.toString())),
            +divisable_by_line.split("divisible by ")[1]!,
            +if_true_line.split("If true: throw to monkey ")[1]!,
            +if_false_line.split("If false: throw to monkey ")[1]!
        );
        return monkey;
    }
    parseInput(input: string): Monkey[] {
        let monkeys: Monkey[] = [];
        let lines = input.split(/\r?\n/).map(x => x.trim()).filter(x => x.length > 0);
        while (lines.length > 0) {
            let monkeyNumber = lines.shift()!;
            monkeys.push(this.parseMonkey(lines));
        }
        // calculate max modulo
        const maxModulo = monkeys.reduce((a,b) => a * b.testDevisableByNumber,1);

        monkeys.forEach(x => x.maxModulo = maxModulo);

        return monkeys;
    }
    part1(input: string): string {
        let monkeys = this.parseInput(input);
        let rounds = 20;
        for (let i = 0; i < rounds; i++) {
            for (let monkey of monkeys) {
                while (monkey.items.length > 0) {
                    const { newItem, nextMonkeyId } = monkey.inspectItem(monkey.items.shift()!);
                    let nextMonkey = monkeys[nextMonkeyId];
                    nextMonkey.items.push(newItem);
                }
            }
            // console.log(`Monkeys after round ${i}: ${monkeys.map(x => `[${x.items.join(", ")}]`).join(", ")}`);
        }
        // console.log(monkeys.map(x => x.inspectionCount))
        return monkeys.map(x => x.inspectionCount).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b).toString();
    }
    part2(input: string): string {
        let monkeys = this.parseInput(input);
        let rounds = 10_000;
        for (let i = 0; i < rounds; i++) {
            for (let monkey of monkeys) {
                while (monkey.items.length > 0) {
                    const { newItem, nextMonkeyId } = monkey.inspectItem(monkey.items.shift()!,false);
                    let nextMonkey = monkeys[nextMonkeyId];
                    nextMonkey.items.push(newItem);
                }
            }
            // if(i % 1000 == 0 || i === 20){
            //     console.log(`Monkeys after round ${i}: ${monkeys.map(x => `[${x.items.join(", ")}]`).join(", ")}`);
            // }
        }
        // console.log(monkeys.map(x => x.inspectionCount))
        return monkeys.map(x => x.inspectionCount).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b).toString();
    }
}

new Day11().run();