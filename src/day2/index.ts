import * as path from 'path';
import { readFileSync } from 'fs';

const INPUT_PATH = path.join(__dirname, 'input.txt');

function autopilot(instruction: string) {
  const [dir, magnitude] = instruction.split(' ');

  switch (dir) {
    case 'forward':
      position.x += Number(magnitude);
      position.y += Number(magnitude) * position.aim;
      break;
    case 'up':
      position.aim -= Number(magnitude);
      break;
    case 'down':
      position.aim += Number(magnitude);
      break;
  }
}

const position = { x: 0, y: 0, aim: 0 };

readFileSync(INPUT_PATH, 'utf8')
  .trim()
  .split('\n')
  .forEach(instruction => autopilot(instruction));

console.log(position.x * position.y);
