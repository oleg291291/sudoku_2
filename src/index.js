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

  function test() {
    var testSum = 0;
    var testHor = 0;
    var testVert = 0;

    for (var col = 0; col < 9; col++) {
      for (var row = 0; row < 9; row++) {
        if(matrix[row][col] == 0){
          return false;
        }
        testVert += matrix[row][col];
        
      }
      if (testVert != 45) {
        return false;
      }
      else{testVert = 0;}
    }

    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        testSum += matrix[row][col];
        testHor += matrix[row][col];
      }
      if (testHor != 45) {
        return false;
      }
      else{testHor = 0;}
    }
    if (testSum != 405) {
      return false;
    }
    else {
      return true;
    }

  }

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
            effective = 1;
            matrix[row][col] = +cellCand[0]
            candArr[row][col] = 'solv';

          }
          if (cellCand.length > 1) {
            candArr[row][col] = cellCand;

          }
        }
      }
    }
    if (effective == 1) {
      singleFinder();
    }
  }

  function hiddenFinderHor() {
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {

        var candArrOne = candArr[row][col];
        if (candArrOne != 'solv') {
          for (var x = 0; x < candArrOne.length; x++) {
            var candArrRowStr = ""
            for (var w = 0; w < 9; w++) {
              if (w != col) {
                candArrRowStr += candArr[row][w];
              }
            }
            if (candArrRowStr.indexOf(candArrOne[x]) < 0) {
              //  console.log(row + " yo " + col);
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] = "solv";
              x = 999;
            }
          }
        }
      }
    }
  }
  function hiddenFinderVert() {
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        var candArrOne = candArr[row][col];
        if (candArrOne != 'solv') {
          for (var x = 0; x < candArrOne.length; x++) {
            var candArrRowStr = ""
            for (var w = 0; w < 9; w++) {
              if (w != row) {
                candArrRowStr += candArr[w][col];
              }
            }
            if (candArrRowStr.indexOf(candArrOne[x]) < 0) {
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] = "solv";
              x = 999;
            }
          }
        }
      }
    }
  }

  function hiddenFinderSq() {
    {
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {

          var candArrOne = candArr[row][col];
          if (candArrOne != 'solv') {
            for (var x = 0; x < candArrOne.length; x++) {

              var candArrRowStr = ""
              var sectRow = Math.floor(row / 3) * 3;
              var sectCol = Math.floor(col / 3) * 3;
              for (var j = 0; j < 3; j++) {
                for (var h = 0; h < 3; h++) {
                  if ((sectRow + j != row) && (sectCol + h != col))
                    candArrRowStr += candArr[sectRow + j][sectCol + h];
                }
              }

              for (var w = 0; w < 9; w++) {
                if (w != row) {
                  candArrRowStr += candArr[w][col];
                }
              }
              if (candArrRowStr.indexOf(candArrOne[x]) < 0) {
                matrix[row][col] = +candArrOne[x];
                candArr[row][col] = "solv";
                x = 999;
              }

            }

          }

        }
      }
    }
  }

  function randCand(x,y) {
    for (var row = 0; row < 9; row++) {
      var counter = 0;
      for (var col = 0; col < 9; col++) {
        if (matrix[row][col] == 0) {
          counter++;
        }
      }
     
   
      
      if (counter == 2) {

   var bckpMatrix = JSON.parse(JSON.stringify(matrix));
      var bckpCand = JSON.parse(JSON.stringify(candArr));
        
        var counter2 = 0;
        for (var col2 = 0; col2 < 9; col2++) {
          if (matrix[row][col2] == 0) {
            if (counter2 == 0) {
              matrix[row][col2] = +candArr[row][col2][x];
              candArr[row][col2] = 'solv'
            }
            else {
              matrix[row][col2] = +candArr[row][col2][y];
              candArr[row][col2] = 'solv'
            }
            counter2++;
          }
        }
          singleFinder();
          hiddenFinderHor();
          singleFinder();
          hiddenFinderVert();
          singleFinder();
          hiddenFinderSq();
          singleFinder();
          singleFinder();
        randCand(0,1);
  randCandVert(0,1);
        if (test()) {
          return matrix;
        }
        else {
          //console.log('failed');
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          if(x == 1 && y == 0){
            return false//console.log('failed 2nd time hor')
          }
          else{
            randCand(1,0);
          }
        }
        


      }
    }

  }

  function randCandVert(x,y) {
    for (var col = 0; col < 9; col++) {
      var counter = 0;
      for (var row = 0; row < 9; row++) {
        if (matrix[row][col] == 0) {
          counter++;
        }
      }
      // var c = Object.assign([], matrix);

      // var bckpMatrixRow = matrix[row].slice(0);
      if (counter == 2) {

var bckpMatrix = JSON.parse(JSON.stringify(matrix));
      var bckpCand = JSON.parse(JSON.stringify(candArr));
        var counter2 = 0;
        for (var row2 = 0; row2 < 9; row2++) {
          if (matrix[row2][col] == 0) {
            if (counter2 == 0) {
              matrix[row2][col] = +candArr[row2][col][x];
              candArr[row2][col] = 'solv'
            }
            else {
              matrix[row2][col] = +candArr[row2][col][y];
              candArr[row2][col] = 'solv'
            }
            counter2++;
          }
        }
        for (var step = 0; step < 3; step++) {



          singleFinder();
          singleFinder();
          singleFinder();
          singleFinder();

          hiddenFinderHor();

          singleFinder();
          singleFinder();
          singleFinder();

          hiddenFinderVert();
          singleFinder();
          singleFinder();
          singleFinder();

          hiddenFinderSq();

          singleFinder();
          singleFinder();
          singleFinder();
          randCand(0,1);
  randCandVert(0,1);
        }
       
        
        if (test()) {
          return matrix;
        }
        else {
          //console.log('failed');
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          if(x == 1 && y == 0){
            return false//console.log('failed 2nd time vert')
          }
          else{
            randCandVert(1,0);
          }
          
        }
        //теперь вызвать все остальные функции
        // вызвать функцию проверки верности. если она не проходит, то поменять местами



      }
    }

  }
  function randomSolverVertPRE(){
    var bckpMatrix = JSON.parse(JSON.stringify(matrix));
      var bckpCand = JSON.parse(JSON.stringify(candArr));
    console.log('vert!')
    for (var col = 0; col < 9; col++) {
      var counter = 0;
      var candArrRand = [];
      for (var row = 0; row < 9; row++) {
        if (matrix[row][col] == 0) {
          counter++;
          for(var s=0; s<candArr[row][col].length; s++){
            if(candArrRand.indexOf(candArr[row][col][s]) == -1){
               candArrRand.push(candArr[row][col][s]);
               }
          }
        }
      }
      //тут подставляем

      // var bckpMatrixRow = matrix[row].slice(0);
      if (counter == 4) {
        
        for(var v = 0; v < 24; v++){

var candArrRandArr = [
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0]],
];

          //var num = 1111;
          var numStr = candArrRandArr[v] + "";
          console.log(numStr);
          // var isIt = 1;
          // for(var vX = 0; vX< 4; vX++){
          //   if(candArrRand.indexOf(numStr[vX]) == -1){
          //     isIt = 0;
          //   }
          // }

          // if(isIt == 1){
          var charNum = 0;

         for (var rowx = 0; rowx < 9; rowx++) {
        if (matrix[rowx][col] == 0) {
           matrix[rowx][col] = +numStr[charNum];
          charNum++;
        }
      } 
      
        }
          singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);

  randomSolver();
  randomSolverVert()
  
          
     if (test()) {
          return matrix;
        }
        else {
          console.log('failed');
          
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          
        }     
          
          
        }
        
  }
}
  function randomSolver(){
    var bckpMatrix = JSON.parse(JSON.stringify(matrix));
      var bckpCand = JSON.parse(JSON.stringify(candArr));
    
    for (var row = 0; row < 9; row++) {
      var counter = 0;
      var candArrRand = [];
      for (var col = 0; col < 9; col++) {
        if (matrix[row][col] == 0) {
          counter++;
          for(var s=0; s<candArr[row][col].length; s++){
            if(candArrRand.indexOf(candArr[row][col][s]) == -1){
               candArrRand.push(candArr[row][col][s]);
               }
          }
        }
      }
      //тут подставляем

      // var bckpMatrixRow = matrix[row].slice(0);
      if (counter == 4) {
        
        for(var v = 0; v < 24; v++){

var candArrRandArr = [
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0]],
];

         // var num = 1111;
          var numStr = candArrRandArr[v] + "";
          console.log(numStr);
          // var isIt = 1;
          // for(var vX = 0; vX< 4; vX++){
          //   if(candArrRand.indexOf(numStr[vX]) == -1){
          //     isIt = 0;
          //   }
          // }

          // if(isIt == 1){
          var charNum = 0;

         for (var colx = 0; colx < 9; colx++) {
        if (matrix[row][colx] == 0) {
           matrix[row][colx] = +numStr[charNum];
          charNum++;
        }
      } 
      
        
          singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);
        
  randomSolverVertPRE();
  randomSolver();
        } ;      
     if (test()) {
          return matrix;
        }
        else {
          console.log('failed');
          
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          
        }     
          
          
        }
        
if (counter == 3) {
        
        for(var v = 0; v < 6; v++){

var candArrRandArr = [
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0]],
];

         // var num = 1111;
          var numStr = candArrRandArr[v] + "";
          console.log(numStr);
          // var isIt = 1;
          // for(var vX = 0; vX< 4; vX++){
          //   if(candArrRand.indexOf(numStr[vX]) == -1){
          //     isIt = 0;
          //   }
          // }

          // if(isIt == 1){
          var charNum = 0;

         for (var colx = 0; colx < 9; colx++) {
        if (matrix[row][colx] == 0) {
           matrix[row][colx] = +numStr[charNum];
          charNum++;
        }
      } 
      
       
          singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);

  randomSolverVertPRE();
  randomSolver();
     }      
     if (test()) {
          return matrix;
        }
        else {
          console.log('failed');
          
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          
        }     
          
          
        }

  }
}

function randomSolverVert(){
    var bckpMatrix = JSON.parse(JSON.stringify(matrix));
      var bckpCand = JSON.parse(JSON.stringify(candArr));
    console.log('vert!')
    for (var col = 0; col < 9; col++) {
      var counter = 0;
      var candArrRand = [];
      for (var row = 0; row < 9; row++) {
        if (matrix[row][col] == 0) {
          counter++;
          for(var s=0; s<candArr[row][col].length; s++){
            if(candArrRand.indexOf(candArr[row][col][s]) == -1){
               candArrRand.push(candArr[row][col][s]);
               }
          }
        }
      }
      //тут подставляем

      // var bckpMatrixRow = matrix[row].slice(0);
      if (counter == 3) {
        
        for(var v = 0; v < 6; v++){

var candArrRandArr = [
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0]],
];

         // var num = 1111;
          var numStr = candArrRandArr[v] + "";
          console.log(numStr);
          // var isIt = 1;
          // for(var vX = 0; vX< 4; vX++){
          //   if(candArrRand.indexOf(numStr[vX]) == -1){
          //     isIt = 0;
          //   }
          // }

          // if(isIt == 1){
          var charNum = 0;

         for (var rowx = 0; rowx < 9; rowx++) {
        if (matrix[rowx][col] == 0) {
           matrix[rowx][col] = +numStr[charNum];
          charNum++;
        }
      } 
      
        
          singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);

  randomSolverVertPRE();
  randomSolver();
      }    
     if (test()) {
          return matrix;
        }
        else {
          console.log('failed');
          
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          
        }     
          
          
        }
      if (counter == 4) {
        
        for(var v = 0; v < 24; v++){

var candArrRandArr = [
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[3] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[3]],
[candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[3] + "" + candArrRand[0]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[2] + "" + candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[1] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[0] + "" + candArrRand[2] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[0] + "" + candArrRand[2]],
[candArrRand[3] + "" + candArrRand[1] + "" + candArrRand[2] + "" + candArrRand[0]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[0] + "" + candArrRand[1]],
[candArrRand[3] + "" + candArrRand[2] + "" + candArrRand[1] + "" + candArrRand[0]],
];

          //var num = 1111;
          var numStr = candArrRandArr[v] + "";
          console.log(numStr);
          // var isIt = 1;
          // for(var vX = 0; vX< 4; vX++){
          //   if(candArrRand.indexOf(numStr[vX]) == -1){
          //     isIt = 0;
          //   }
          // }

          // if(isIt == 1){
          var charNum = 0;

         for (var rowx = 0; rowx < 9; rowx++) {
        if (matrix[rowx][col] == 0) {
           matrix[rowx][col] = +numStr[charNum];
          charNum++;
        }
      } 
      
        
          singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);

  randomSolver();
  randomSolverVert()
  
          
     if (test()) {
          return matrix;
        }
        else {
          console.log('failed');
          
          matrix = JSON.parse(JSON.stringify(bckpMatrix));
          candArr = JSON.parse(JSON.stringify(bckpCand));
          
        }     
          
        }  
        }
        
  }
}

  singleFinder();
  hiddenFinderHor();
  singleFinder();
  hiddenFinderVert();
  singleFinder();
  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();

  randCand(0,1);
  randCandVert(0,1);
  
  singleFinder();
  singleFinder();

  hiddenFinderHor();

  singleFinder();
  singleFinder();

  hiddenFinderVert();
  singleFinder();
  singleFinder();
  singleFinder();

  hiddenFinderSq();

  singleFinder();
  singleFinder();
  singleFinder();
  
  randCand(0,1);
  randCandVert(0,1);
randomSolver()
randomSolverVert()
 //console.log(candArr);
console.log(matrix);
return matrix;


}

