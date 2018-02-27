module.exports = function solveSudoku(matrix)  {
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
  function singleFinder() {
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
          for (var x = 1; x < 10; x++){
            if(inField.indexOf(x) == -1){
              cellCand += x;
            }
          }
          if(cellCand.length == 1){
            matrix[row][col] = +cellCand[0]
            console.log(matrix[row]);
            
          }
          if(cellCand.length > 1){
            candArr[row][col] = cellCand;
          }
        }
      }
    }
  }
function hiddenFinder(){
  
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      var candCell = candArr[row][col];
      if(candCell != 'solv'){
        for(var z = 0; z < candCell.length; z++){ 
          var horStr = "";
          for(var i = 0; i < 9; i++){
          if(i != col){
            horStr += candArr[row][i];
          }            
            }
          if(horStr.indexOf(candCell[z]) == -1){
              matrix[row][col] = +candCell[z];
            console.log(row + "--" + col + " " + candCell[z]);
              candCell = matrix[row][col] + "";            
        }
        }     
      }   
    }
  }
  
   for (var col = 0; col < 9; col++) {
    for (var row = 0; row < 9; row++) {
      var candCell = candArr[row][col];
      if(candCell != 'solv'){
        for(var z = 0; z < candCell.length; z++){ 
          var horStr = "";
          for(var i = 0; i < 9; i++){
          if(i != row){
            horStr += candArr[i][col];
          }            
            }
          if(horStr.indexOf(candCell[z]) == -1){
              matrix[row][col] = +candCell[z];
            console.log(row + "--" + col + " " + candCell[z]);
              candCell = matrix[row][col] + "";            
        }
        }     
      }   
    }
  }
}

for (var step = 0; step<10; step++){
singleFinder();
singleFinder();
hiddenFinder();
  
}

console.log(candArr);
  console.log(matrix);


}
