import * as path from 'path';
import { readFileSync } from 'fs';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const startingFish = readFileSync(INPUT_PATH, 'utf8').trim().split(',').map(Number);

function sum(acc: number, val: number) {
  acc += val;
  return acc;
}

const state: { [key: number]: number } = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

startingFish.forEach(fish => {
  state[fish]++;
});

for (let day = 0; day < 256; day++) {
  const spawns = state[0];

  Object.keys(state)
    .map(Number)
    .forEach(k => {
      if (k === 8) { state[k] = spawns; return; }
      if (k === 6) { state[k] = spawns + state[k + 1]; return; }
      state[k] = state[k + 1];
    });
}

console.log(Object.values(state).reduce(sum, 0));
