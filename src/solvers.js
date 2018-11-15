/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  const board = new Board({ n });
  let solution;
  let solnFound = false;

  const checkEachRow = function (rowIdx, currBoard) {
    const row = currBoard.get(rowIdx);
    const nextRowIdx = rowIdx + 1;
    
    for (let i = 0; i < row.length; i++) {
      if (!solnFound) {
        currBoard.togglePiece(rowIdx, i);
        if (!currBoard.hasAnyRooksConflicts()) {
          if (nextRowIdx === n) {
            solution = currBoard.rows();
            solnFound = true;
          } else {
            checkEachRow(nextRowIdx, currBoard);
          }
        }
        (!solnFound) && currBoard.togglePiece(rowIdx, i);
      }
    }
  };

  checkEachRow(0, board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  const board = new Board({ n });
  let solutionCount = 0;

  const checkEachRow = function (rowIdx, currBoard) {
    const row = currBoard.get(rowIdx);
    const nextRowIdx = rowIdx + 1;
    for (let i = 0; i < row.length; i++) {
      currBoard.togglePiece(rowIdx, i);
      if (!currBoard.hasAnyRooksConflicts()) {
        if (nextRowIdx === n) {
          solutionCount++;
          currBoard.togglePiece(rowIdx, i);
          return;
        } else {
          checkEachRow(nextRowIdx, currBoard);
        }
      }
      currBoard.togglePiece(rowIdx, i);
    }
  };

  checkEachRow(0, board);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  const board = new Board({ n });
  let solution = board.rows();
  let solnFound = false;

  if (n === 0) {
    return solution;
  }

  const checkEachRow = function (rowIdx, currBoard) {
    const row = currBoard.get(rowIdx);
    const nextRowIdx = rowIdx + 1;
    
    for (let i = 0; i < row.length; i++) {
      if (!solnFound) {
        currBoard.togglePiece(rowIdx, i);
        if (!currBoard.hasAnyQueensConflicts()) {
          if (nextRowIdx === n) {
            solution = currBoard.rows();
            solnFound = true;
          } else {
            checkEachRow(nextRowIdx, currBoard);
          }
        }
        (!solnFound) && currBoard.togglePiece(rowIdx, i);
      }
    }
  };
  
  checkEachRow(0, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  const board = new Board({ n });
  var solutionCount = 0;

  if (n === 0) {
    return 1;
  }

  const checkEachRow = function (rowIdx, currBoard) {
    const row = currBoard.get(rowIdx);
    const nextRowIdx = rowIdx + 1;
    for (let i = 0; i < row.length; i++) {
      currBoard.togglePiece(rowIdx, i);
      if (!currBoard.hasAnyQueensConflicts()) {
        if (nextRowIdx === n) {
          solutionCount++;
          currBoard.togglePiece(rowIdx, i);
          return;
        } else {
          checkEachRow(nextRowIdx, currBoard);
        }
      }
      currBoard.togglePiece(rowIdx, i);
    }
  };

  checkEachRow(0, board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// Time Complexity
// findNRooksSolution: O(n^n)
// countNRooksSolutions: O(n^n)
// findNQueensSolution: O(n^n)
// countNQueensSolutions: O(n^n)