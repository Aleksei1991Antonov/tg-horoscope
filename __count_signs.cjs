const fs = require('fs');
const c = fs.readFileSync('src/core/constants/signHoroscope.ts', 'utf-8');
const signs = ['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'];
const bands = ['high','mediumHigh','mediumLow','low'];

for (let s of signs) {
  let si = c.indexOf('"'+s+'": {');
  if (si < 0) { console.log(s+': NOT FOUND'); continue; }
  let se = c.indexOf('},', si);
  let block = c.slice(si, se+2);
  let lines = block.split('\n');
  let total = 0;
  for (let b of bands) {
    let re = new RegExp('"'+b+'":\\s*\\[', '');
    let bi = -1;
    for (let k = 0; k < lines.length; k++) {
      if (re.test(lines[k])) { bi = k; break; }
    }
    if (bi < 0) { console.log(s+' / '+b+': NOT FOUND'); continue; }
    let count = 0;
    for (let k = bi+1; k < lines.length; k++) {
      if (lines[k].trim() === '],') break;
      if (lines[k].includes('description:')) count++;
    }
    console.log(s+' / '+b+': '+count);
    total += count;
  }
  console.log(s+' TOTAL: '+total+'\n');
}
fs.rmSync('__count_signs.js');
