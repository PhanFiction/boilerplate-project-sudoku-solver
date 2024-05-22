const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

  suiteSetup(() => {
    solver = new SudokuSolver();
  });

  test('Validate puzzle string with valid characters and length', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    const validation = solver.validate(puzzle);
    assert.isTrue(validation.valid);
  });

  test('Validate puzzle string with invalid characters', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7A';
    const validation = solver.validate(puzzle);
    assert.isFalse(validation.valid);
    assert.equal(validation.error, 'Expected puzzle to be 81 characters long.');
  });

  test('Validate puzzle string with incorrect length', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..';
    const validation = solver.validate(puzzle);
    assert.isFalse(validation.valid);
    assert.equal(validation.error, 'Expected puzzle to be 81 characters long.');
  });

  test('Check row placement to be false', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 2, '5'));
  });

  test('Check invalid row placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 1, '1'));
  });

  test('Check valid column placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isTrue(solver.checkColPlacement(puzzle, 0, 1, '7'));
  });

  test('Check invalid column placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 1, '2'));
  });

  test('Check valid region placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 1, '3'));
  });

  test('Check invalid region placement', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    assert.isFalse(solver.checkRegionPlacement(puzzle, 0, 1, '6'));
  });

  test('Solve valid puzzle', () => {
    let answer = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), answer);
  });

  test('Solve invalid puzzle', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..';
    const solution = solver.solve(puzzle);
    assert.isNull(solution);
  });

  test('Solve unsolvable puzzle', () => {
    const puzzle = '115..2.84..63.12.7.2..5.....9..1....8.2....3..6..9...9..4..3.25..2.1..3.1.4..5..7';
    const solution = solver.solve(puzzle);
    assert.isNull(solution);
  });

});
