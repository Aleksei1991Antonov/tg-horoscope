import fs from 'fs';
const content = fs.readFileSync('src/core/constants/signHoroscope.ts', 'utf-8');

// Just look for patterns manually around line 54 area
let lines = content.split('\n');
for (let i = 1; i < 75; i++) {
  console.log(i+': '+lines[i-1]);
}
