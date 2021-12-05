import * as path from 'path';
import { readFileSync } from 'fs';
import VentMap from './VentMap';

const INPUT_PATH = path.join(__dirname, 'input.txt');

export type Line = [Coordinate, Coordinate];

type Coordinate = {
  x: number;
  y: number;
};

function isDiagonalLine(vent: Line) {
  return !(vent[0].x === vent[1].x || vent[0].y === vent[1].y);
}

const vents: Line[] = readFileSync(INPUT_PATH, 'utf8')
  .trim()
  .split('\n')
  .map(
    line =>
      line.split(' -> ').map(coord => {
        return {
          x: Number(coord.split(',')[0]),
          y: Number(coord.split(',')[1]),
        };
      }) as Line
  );
// .filter(vent => !isDiagonalLine(vent));

console.log(new VentMap(vents).overlapCount());
