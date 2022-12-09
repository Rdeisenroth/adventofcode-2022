import * as fs from 'fs';
import * as path from 'path';
import { AdventOfCodeDay } from '../util/util';

interface file {
    name: string,
    size?: number,
    type: 'file' | 'directory',
    subfiles?: file[],
}
type commandMode = "cd" | "ls";
export class Day7 extends AdventOfCodeDay {
    day = 7;
    generateFileTree(inputLines:string[]): file {
        let rootDir: file = {
            name: "/",
            type: "directory",
            subfiles: [],
        }

        // Collect directories
        let curPath = "/"
        let cwd = rootDir
        let cmd: commandMode = "cd"

        // Collect files
        for (const line of inputLines) {
            // check for command
            // commands start with "$ "
            if (line.startsWith("$ ")) {
                const cmdName = line.split(" ")[1]
                if (cmdName === "cd") {
                    cmd = "cd"

                    // update curPath
                    const cmdPath = line.substring("$ cd ".length)
                    curPath = path.join(curPath, cmdPath)

                    // update cwd
                    cwd = rootDir;
                    if(curPath !== path.sep) {
                        const dirs = curPath.split(path.sep).slice(1)
                        for (const dir of dirs) {
                            cwd = cwd.subfiles!.find(x => x.name === dir)!
                        }
                    }
                } else if (cmdName === "ls") {
                    cmd = "ls"
                } else {
                    throw new Error(`Unknown command ${cmdName}`)
                }
                continue
            }
            // we should be in ls mode, if not, throw error
            if (cmd !== "ls") {
                throw new Error("Expected ls mode")
            }

            const [size, name] = line.split(" ");
            // if size is a number, it's a file
            const type = /^\d+$/.test(size) ? "file" : "directory";
            cwd.subfiles!.push({
                name,
                type,
                ...(type === "file" ? { size: parseInt(size) } : {}),
                ...(type === "directory" ? { subfiles: [] } : {}),
            });
        }

        return rootDir;
    }

    updateDirectorySizes(rootDir: file): number {
        return rootDir.type === "file" ? rootDir.size! : rootDir.size = rootDir.subfiles!.reduce((acc, x) => acc + this.updateDirectorySizes(x), 0);
    }

    getAllFilesAndDirectories(rootDir: file): file[] {
        return rootDir.type === "file" ? [rootDir] : rootDir.subfiles!.reduce((acc, x) => acc.concat(this.getAllFilesAndDirectories(x)), [rootDir]);
    }

    setup(input: string[]): file {
        const rootDir = this.generateFileTree(input);
        this.updateDirectorySizes(rootDir);
        return rootDir;
    }

    printDirectoryTree(pwd: file, indent: string = ""): void {
        console
            .log(`${indent}- ${pwd.name} (${pwd.type}, size=${pwd.size})`);
        if (pwd.type === "directory") {
            for (const subfile of pwd.subfiles!) {
                this.printDirectoryTree(subfile, indent + "  ");
            }
        }
    }

    part1(input: string): string {
        // task: sum of all directory sizes of directories smaller than 100_000.
        const rootDir = this.setup(input.split(/\n/));
        const files = this.getAllFilesAndDirectories(rootDir);
        const smallDirectories = files.filter(x => x.type === "directory" && x.size! <= 100_000);
        return smallDirectories.reduce((x, y) => x + y.size!, 0).toString();
    }
    part2(input: string): string {
        const diskSpace = 70_000_000;
        const required_space = 30_000_000;
        const rootDir = this.setup(input.split(/\n/));
        const freeDiskSpace = diskSpace - rootDir.size!;
        const required_space_to_free = required_space - freeDiskSpace;
        // find directories that are big enough to free up the required space
        const files = this.getAllFilesAndDirectories(rootDir);
        const bigDirectories = files.filter(x => x.type === "directory" && x.size! >= required_space_to_free);
        // return the smallest of these directories
        return bigDirectories.reduce((x, y) => x.size! < y.size! ? x : y).size!.toString();
    }
}

new Day7().run();