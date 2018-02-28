module.exports = function solveSudoku(matrix) {
  // your solution
  var candArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var effective = 0;

  function singleFinder() {
    effective = 0;
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (matrix[row][col] != 0) {
          candArr[row][col] = "solv";
        }
        if (matrix[row][col] == 0) {
          var inField = [];
          for (var i = 0; i < 9; i++) {
            inField.push(matrix[row][i]);
            inField.push(matrix[i][col]);
          }
          //добавить квадрат
          var sectRow = Math.floor(row / 3) * 3;
          var sectCol = Math.floor(col / 3) * 3;
          for (var j = 0; j < 3; j++) {
            for (var h = 0; h < 3; h++) {
              inField.push(matrix[sectRow + j][sectCol + h]);
            }
          }
          inField = inField.join("");
          var cellCand = "";
          for (var x = 1; x < 10; x++) {
            if (inField.indexOf(x) == -1) {
              cellCand += x;
            }
          }
          if (cellCand.length == 1) {
            matrix[row][col] = +cellCand[0]
            candArr[row][col] = 'solv';

          }
          if (cellCand.length > 1) {
            candArr[row][col] = cellCand;
            effective = 1;
          }
        }
      }
    }
    console.log(matrix);
    console.log(candArr);
  }
  function hiddenFinderHor() {
    effective = 0;
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        var candCell = candArr[row][col];
        if (candCell != 'solv') {
          for (var z = 0; z < candCell.length; z++) {
            var horStr = "";
            for (var i = 0; i < 9; i++) {
              if (i != col) {
                horStr += candArr[row][i];
              }
            }
            if (horStr.indexOf(candCell[z]) == -1) {
              matrix[row][col] = +candCell[z];
              candArr[row][col] = 'solv';
              effective = 1;
            }
          }
        }
      }
    }
  }
  function hiddenFinderVert() {
    effective = 0;
    for (var col = 0; col < 9; col++) {
      for (var row = 0; row < 9; row++) {
        var candCellVert = candArr[row][col];
        if (candCellVert != 'solv') {
          var vertStr = "";
          for (var i = 0; i < 9; i++) {
            if (i != row) {
              vertStr += candArr[i][col];
            }
          }
          for (var z = 0; z < candCellVert.length; z++) {
            if (vertStr.indexOf(candCellVert[z]) == -1) {
              matrix[row][col] = +candCellVert[z];
              candArr[row][col] = 'solv';
              effective = 1;
            }
          }
        }
      }
    }
  }

  do {
    singleFinder();
    singleFinder();
    hiddenFinderHor();
    singleFinder();
    singleFinder();
    hiddenFinderVert();

  } while (effective == 1);


  console.log(candArr);
  console.log(matrix);
  return matrix;


}

