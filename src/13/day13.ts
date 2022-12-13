import { AdventOfCodeDay } from "../util/util";
import * as util from 'util';
import * as _ from 'lodash';

type Package = Array<Package | number>;
type PackageGroup = Array<Package>;
export class Day13 extends AdventOfCodeDay {
    day = 13;
    parseInput(input: string): PackageGroup[] {
        var packageGroups = input.split("\n\n");
        var packages = packageGroups.map(g => g.split("\n").map(p => eval(p) as Package) as PackageGroup);
        return packages;
    }
    comparePairs(package1: Package | number, package2: Package | number): number {
        // if both are numbers, the smaller one comes first
        if (typeof package1 === "number" && typeof package2 === "number") {
            return package1 - package2;
        }
        // if we have two packages, compare each element, if the length is different, the shorter package comes first
        if (Array.isArray(package1) && Array.isArray(package2)) {
            var minLength = Math.min(package1.length, package2.length);
            for (var i = 0; i < minLength; i++) {
                var result = this.comparePairs(package1[i], package2[i]);
                if (result !== 0) {
                    return result;
                }
            }
            return package1.length - package2.length;
        }
        // if one is a number and the other a package, convert the number to a package and compare
        if (typeof package1 === "number") {
            return this.comparePairs([package1], package2);
        }
        if (typeof package2 === "number") {
            return this.comparePairs(package1, [package2]);
        }
        else {
            return 0;
        }
    }
    isOrdered(pg: PackageGroup) {
        for (var i = 0; i < pg.length - 1; i++) {
            if (this.comparePairs(pg[i], pg[i + 1]) > 0) {
                return false;
            }
        }
        return true;
    }
    part1(input: string): string {
        const packageGroups = this.parseInput(input);
        return packageGroups
            .map((g, i) => [this.isOrdered(g), i + 1] as [boolean, number])
            .filter(p => p[0])
            .map(p => p[1])
            .reduce((a, b) => a + b, 0)
            .toString();
    }
    part2(input: string): string {
        const packageGroups = this.parseInput(input);

        const dividerPackages: PackageGroup = [
            [[2]],
            [[6]]
        ];
        packageGroups.push(dividerPackages);
        // flatten to a single package group
        const packages = _.flatten(packageGroups)
            .sort((a, b) => this.comparePairs(a, b));
        // get indices of divider packages
        const dividerIndices = dividerPackages.map(d => packages.indexOf(d) + 1).reduce((a, b) => a * b, 1);
        return dividerIndices.toString();
    }
}

new Day13().run();