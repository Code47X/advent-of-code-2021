import { readFileSync } from 'fs';
import * as path from 'path';

const INPUT_PATH = path.join(__dirname, 'input.txt');
const input = readFileSync(INPUT_PATH, 'utf8').trim().split(',').map(Number);

const totalFuelCosts: number[] = [];
const maxPosition = Math.max(...input);

for (let p = 0; p <= maxPosition; p++) {
  totalFuelCosts[p] = input.reduce((acc, val) => {
    let distance = Math.abs(val - p);
    let total = 0;

    for (let x = 1, cost = 1; x <= distance; x++) {
      total += cost;
      cost++;
    }

    acc += total;
    return acc;
  }, 0);
}

const min = totalFuelCosts.indexOf(Math.min(...totalFuelCosts));
console.log(totalFuelCosts[min]);
