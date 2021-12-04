import * as path from 'path';
import { readFileSync } from 'fs';

const INPUT_PATH = path.join(__dirname, 'input.txt');

function sum(acc: number, cur: number) {
  return acc + cur;
}

function total_depth_increases(acc: number, _: number, i: number, arr: number[]) {
  if (i < 3) return 0;

  let current = arr.slice(i - 2, i + 1).reduce(sum, 0);
  let last = arr.slice(i - 3, i).reduce(sum, 0);

  return current > last ? acc + 1 : acc;
}

const result = readFileSync(INPUT_PATH, 'utf8')
  .trim()
  .split('\n')
  .map(Number)
  .reduce(total_depth_increases, 0);

console.log(result);
