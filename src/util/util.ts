import * as fs from 'fs';

export const year = 2022;
export abstract class AdventOfCodeDay{
    abstract day: number;
    private _inputPath?: string;
    get inputPath(): string {
        return this._inputPath ?? `data/day${this.day}.txt`;
    }
    set inputPath(path: string) {
        this._inputPath = path;
    }

    get input(): string {
        return fs.readFileSync(this.inputPath, 'utf-8');
    }
    get inputLines(): string[] {
        return this.input.split(/\n/);
    }

    abstract part1(input: string): string;
    abstract part2(input: string): string;
    run() {
        console.log(`Day ${this.day} part 1: ${this.part1(this.input)}`);
        console.log(`Day ${this.day} part 2: ${this.part2(this.input)}`);
    }
    testRun() {
        this.inputPath = `data_test/day${this.day}.txt`;
        this.run();
    }
}