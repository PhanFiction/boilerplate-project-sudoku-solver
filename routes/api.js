'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Validate required fields
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validate puzzle length
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      // Validate puzzle characters
      if (/[^1-9.]/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      // Validate coordinate
      if (!/^[A-I][1-9]$/.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      // Validate value
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate.charCodeAt(0) - 65; // Convert A-I to 0-8
      const col = parseInt(coordinate[1]) - 1; // Convert 1-9 to 0-8

      // Check if the value is already placed correctly
      if (puzzle[row * 9 + col] === value) {
        return res.json({ valid: true });
      }

      const conflicts = solver.checkPlacement(puzzle, row, col, value);

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      } else {
        return res.json({ valid: true });
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      // Validate required field
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      // Validate puzzle length
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      // Validate puzzle characters
      if (/[^1-9.]/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      // Validate puzzle structure
      const validation = solver.validate(puzzle);
      if (!validation.valid) {
        return res.json({ error: validation.error });
      }

      // Solve puzzle
      const solution = solver.solve(puzzle);

      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      return res.json({ solution });
    });
};
