// var day3=s=>_.sum(_.chunk(s.split(/\n/),3).map(([a,b,c])=>[...new Set(a)].find(x=>b.includes(x)&&c.includes(x))).map(c=>c.charCodeAt(0)-(c.charCodeAt(0)>96?96:38)))