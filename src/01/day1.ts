console.log(
    require('fs').readFileSync('data/day1.txt', 'utf8')
            .split(/\n\n/)
            .map(x => x.split(/\n/).map(y => +y).reduce((x, y) => x + y))
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((x, y) => x + y)
    )