import * as path from 'path';
import { readFileSync } from 'fs';
import BingoBoard from './BingoBoard';

const INPUT_PATH = path.join(__dirname, 'input.txt');

const input = readFileSync(INPUT_PATH, 'utf8')
  .trim()
  .split(/\n\s*\n/);

const drawPile = input.shift()!.split(',').map(Number);

let bingoBoards = input
  .map(board => board.split('\n').map(row => row.split(/\s+/).map(Number)))
  .map(board => new BingoBoard(board, []));

let draws: number[] = [];
let winOrder: BingoBoard[] = [];

while (bingoBoards.length > 0) {
  draws.push(drawPile.shift()!);

  bingoBoards.forEach(board => {
    board.draws = draws;
  });

  bingoBoards
    .filter(b => b.isWinner())
    .forEach(winner => {
      winOrder.push(winner);
    });

  bingoBoards = bingoBoards.filter(b => !b.isWinner());
}

console.log(winOrder.pop()?.score());
