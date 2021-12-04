import * as path from 'path';
import { readFileSync } from 'fs';

const INPUT_PATH = path.join(__dirname, 'input.txt');

function mostCommonBitValue(bitCounts: number[]) {
  if (bitCounts[0] == bitCounts[1]) return null;
  return bitCounts.indexOf(Math.max(...bitCounts));
}

function leastCommonBitValue(bitCounts: number[]) {
  if (bitCounts[0] == bitCounts[1]) return null;
  return bitCounts.indexOf(Math.min(...bitCounts));
}

function bitCounts(acc: number[], val: number) {
  acc[val]++;
  return acc;
}

function ratings(input: number[][]) {
  let o2Binaries = [...input];
  let co2Binaries = [...input];
  let i: number;

  i = 0;
  while (o2Binaries.length > 1) {
    let val = mostCommonBitValue(o2Binaries.map(row => row[i]).reduce(bitCounts, [0, 0]));
    if (val === null) val = 1;

    o2Binaries = o2Binaries.filter(row => row[i] === val);
    i++;
  }

  i = 0;
  while (co2Binaries.length > 1) {
    let val = leastCommonBitValue(co2Binaries.map(row => row[i]).reduce(bitCounts, [0, 0]));
    if (val === null) val = 0;

    co2Binaries = co2Binaries.filter(row => row[i] === val);
    i++;
  }

  return {
    o2Rating: parseInt(o2Binaries[0].join(''), 2),
    co2Rating: parseInt(co2Binaries[0].join(''), 2),
  };
}

function rates(input: number[][]) {
  let gammaBinary = [];
  let epsilonBinary = [];

  for (let i = 0; i < input[0].length; i++) {
    gammaBinary.push(mostCommonBitValue(input.map(row => row[i]).reduce(bitCounts, [0, 0])));
    epsilonBinary.push(leastCommonBitValue(input.map(row => row[i]).reduce(bitCounts, [0, 0])));
  }

  return {
    gammaRate: parseInt(gammaBinary.join(''), 2),
    epsilonRate: parseInt(epsilonBinary.join(''), 2),
  };
}

function diagnosticReport(input: number[][]) {
  const { gammaRate, epsilonRate } = rates(input);
  const { o2Rating, co2Rating } = ratings(input);

  return {
    powerConsumption: gammaRate * epsilonRate,
    lifeSupportRating: o2Rating * co2Rating,
  };
}

const input = readFileSync(INPUT_PATH, 'utf8')
  .trim()
  .split('\n')
  .map(row => row.split('').map(Number));

const { powerConsumption, lifeSupportRating } = diagnosticReport(input);
console.log(powerConsumption, lifeSupportRating);
