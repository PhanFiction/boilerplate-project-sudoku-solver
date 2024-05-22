class SudokuSolver {

  validate(puzzleString) {
    // Check if the puzzleString length is exactly 81 characters
    if (puzzleString.length !== 81) {
      return { valid: false, error: "Expected puzzle to be 81 characters long." };
    }

    // Check if the puzzleString contains only digits (1-9) or dots (.)
    if (/[^1-9.]/.test(puzzleString)) {
      return { valid: false, error: "Invalid characters in puzzle." };
    }

    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const start = row * 9;
    const rowValues = puzzleString.slice(start, start + 9);
    
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colValues = [];
    
    for (let i = 0; i < 9; i++) {
      colValues.push(puzzleString[column + i * 9]);
    }

    return !colValues.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    const regionValues = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionValues.push(puzzleString[(startRow + i) * 9 + startCol + j]);
      }
    }

    return !regionValues.includes(value);
  }

  checkPlacement(puzzleString, row, column, value) {
    const conflicts = [];

    if (!this.checkRowPlacement(puzzleString, row, column, value)) {
      conflicts.push('row');
    }

    if (!this.checkColPlacement(puzzleString, row, column, value)) {
      conflicts.push('column');
    }

    if (!this.checkRegionPlacement(puzzleString, row, column, value)) {
      conflicts.push('region');
    }

    return conflicts;
  }

  solve(puzzleString) {
    const validateResult = this.validate(puzzleString);
    if (!validateResult.valid) {
      return null;
    }

    const solveHelper = (puzzle) => {
      const index = puzzle.indexOf('.');
      if (index === -1) {
        return puzzle; // puzzle solved
      }

      const row = Math.floor(index / 9);
      const col = index % 9;

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (
          this.checkRowPlacement(puzzle, row, col, value) &&
          this.checkColPlacement(puzzle, row, col, value) &&
          this.checkRegionPlacement(puzzle, row, col, value)
        ) {
          const newPuzzle = puzzle.slice(0, index) + value + puzzle.slice(index + 1);
          const solvedPuzzle = solveHelper(newPuzzle);
          if (solvedPuzzle) {
            return solvedPuzzle;
          }
        }
      }

      return null; // backtrack
    };

    const solvedPuzzle = solveHelper(puzzleString);
    return solvedPuzzle;
  }
}

module.exports = SudokuSolver;
