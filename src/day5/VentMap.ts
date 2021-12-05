import { Line } from './index';

class VentMap {
  private data: number[][];

  constructor(public vents: Line[]) {
    const maxDistance = this.findMaxDistance();

    this.data = Array(maxDistance + 1)
      .fill(null)
      .map(row => Array(maxDistance + 1).fill(0));

    this.buildMap();
  }

  overlapCount() {
    return this.data.reduce((acc, row) => {
      acc += row.filter(v => v > 1).length;
      return acc;
    }, 0);
  }

  private findMaxDistance() {
    return Math.max(
      ...this.vents.flatMap(coords => [...Object.values(coords[0]), ...Object.values(coords[1])])
    );
  }

  private buildMap() {
    this.vents.forEach(vent => {
      switch (this.direction(vent)) {
        case 'horizontal':
          this.addHorizontalLine(vent);
          break;
        case 'vertical':
          this.addVerticalLine(vent);
          break;
        case 'diagonal':
          this.addDiagonalLine(vent);
          break;
      }
    });
  }

  private direction(vent: Line) {
    if (vent[0].x === vent[1].x || vent[0].y === vent[1].y) {
      return vent[0].x === vent[1].x ? 'vertical' : 'horizontal';
    }
    return 'diagonal';
  }

  private addHorizontalLine(vent: Line) {
    const xMin = Math.min(...[vent[0].x, vent[1].x]);
    const xMax = Math.max(...[vent[0].x, vent[1].x]);
    const y = vent[0].y;

    for (let x = xMin; x <= xMax; x++) {
      this.data[y][x]++;
    }
  }

  private addVerticalLine(vent: Line) {
    const yMin = Math.min(...[vent[0].y, vent[1].y]);
    const yMax = Math.max(...[vent[0].y, vent[1].y]);
    const x = vent[0].x;

    for (let y = yMin; y <= yMax; y++) {
      this.data[y][x]++;
    }
  }

  private addDiagonalLine(vent: Line) {
    const [start, end] = vent;

    if (start.x < end.x) {
      if (start.y < end.y) {
        for (let x = start.x, y = start.y; x <= end.x && y <= end.y; x++, y++) {
          this.data[y][x]++;
        }
      } else {
        for (let x = start.x, y = start.y; x <= end.x && y >= end.y; x++, y--) {
          this.data[y][x]++;
        }
      }
    } else {
      if (start.y < end.y) {
        for (let x = start.x, y = start.y; x >= end.x && y <= end.y; x--, y++) {
          this.data[y][x]++;
        }
      } else {
        for (let x = start.x, y = start.y; x >= end.x && y >= end.y; x--, y--) {
          this.data[y][x]++;
        }
      }
    }
  }
}

export default VentMap;
