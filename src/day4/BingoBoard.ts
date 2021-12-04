class BingoBoard {
  constructor(public board: number[][], public draws: number[]) {}

  isWinner() {
    return this.hasWinningRow() || this.hasWinningCol();
  }

  score() {
    const unmarkedNumbers = this.board.flat().filter(num => !this.draws.includes(num));
    return unmarkedNumbers.reduce(this.sum, 0) * this.draws[this.draws.length - 1];
  }

  private hasWinningRow() {
    return this.board.some(row => row.every(val => this.draws.includes(val)));
  }

  private hasWinningCol() {
    let cols = this.board[0].map((_, col) => this.board.map((_, row) => this.board[row][col]));
    return cols.some(col => col.every(val => this.draws.includes(val)));
  }

  private sum(acc: number, val: number) {
    return acc + val;
  }
}

export default BingoBoard;
