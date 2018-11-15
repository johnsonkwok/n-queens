// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    // Time Complexity
    // rows: O(n)
    // togglePiece: O(1)
    // _getFirstRowColumnIndexForMajorDiagonalOn: O(1)
    // _getFirstRowColumnIndexForMinorDiagonalOn: O(1)
    // hasAnyRooksConflicts: O(n^2)
    // hasAnyQueenConflictsOn: O(n)
    // hasAnyQueensConflicts: O(n^2)
    // isInBounds: O(1)

    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      const row = this.rows()[rowIndex];
      const rowSum = _.reduce(row, (acc, cv) => acc + cv);
      return rowSum > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      const board = this.rows();
      return _.some(board, (row, i) => {
        return this.hasRowConflictAt(i);
      });
    },

    // Time Complexity
    // hasRowConflictAt: O(n)
    // hasAnyRowConflicts: O(n)

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      const col = _.map(this.rows(), (row) => {
        return row[colIndex];
      });
      const colSum = _.reduce(col, (acc, cv) => acc + cv);
      return colSum > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      const board = this.rows();
      return _.some(board, (col, i) => {
        return this.hasColConflictAt(i);
      });
    },

    // Time Complexity
    // hasColConflictAt: O(n)
    // hasAnyColConflicts: O(n) 

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      let colIdx = majorDiagonalColumnIndexAtFirstRow;
      let rowIdx = 0;
      const majorDiag = [];
      const board = this.rows();
      while (colIdx < board.length && rowIdx < board.length) {
        majorDiag.push(board[rowIdx][colIdx] || 0);
        rowIdx++;
        colIdx++;
      }

      const majorDiagSum = _.reduce(majorDiag, (acc, cv) => acc + cv);
      return majorDiagSum > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      const lastIdx = this.get('n') - 1;
      let hasConflict = false;
      for (let i = -lastIdx; i <= lastIdx; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasConflict = true;
        }
      }
      return hasConflict;
    },

    // Time Complexity
    // hasMajorDiagonalConflictAt: O(n)
    // hasAnyMajorDiagonalConflicts: O(n)

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let colIdx = minorDiagonalColumnIndexAtFirstRow;
      let rowIdx = 0;
      const minorDiag = [];
      const board = this.rows();
      while (colIdx >= 0 && rowIdx < board.length) {
        minorDiag.push(board[rowIdx][colIdx] || 0);
        rowIdx++;
        colIdx--;
      }

      const minorDiagSum = _.reduce(minorDiag, (acc, cv) => acc + cv);
      return minorDiagSum > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      const lastIdx = (this.get('n') - 1) * 2;
      let hasConflict = false;
      for (let i = lastIdx; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          hasConflict = true;
        }
      }
      return hasConflict;
    }

    // Time Complexity
    // hasMinorDiagonalConflictAt: O(n)
    // hasAnyMinorDiagonalConflicts: O(n)

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
