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
  var effective = 0;

  function test(){
    var testSum = 0;
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        testSum += matrix[row][col];
      }
     }
    return testSum;
   // console.log(testSum)
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
    
  }
  
  function hiddenFinderHor() {
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        
          var candArrOne = candArr[row][col];
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          
//             var candArrRowStr = candArr[row].join('');
          var candArrRowStr = ""
          for(var w = 0; w< 9; w++){
            if(w != col){
              candArrRowStr += candArr[row][w];
            }
          }
          
         // console.log(candArrRowStr)
         // console.log(candArrOne[x])
         // console.log(candArrRowStr.indexOf(candArrOne[x]))
          
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
             //  console.log(row + " yo " + col);
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
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
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          
//             var candArrRowStr = candArr[row].join('');
          var candArrRowStr = ""
          for(var w = 0; w< 9; w++){
            if(w != row){
              candArrRowStr += candArr[w][col];
            }
          }
          
        //  console.log(candArrRowStr)
         // console.log(candArrOne[x])
         // console.log(candArrRowStr.indexOf(candArrOne[x]))
          
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
             //  console.log(row + " yo " + col);
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
              x = 999;
            }
           
          }
           
        }
       
      }
     }
  }

  function hiddenFinderSq(){
    {
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        
          var candArrOne = candArr[row][col];
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          
//             var candArrRowStr = candArr[row].join('');
          var candArrRowStr = ""
          
           var sectRow = Math.floor(row / 3) * 3;
          var sectCol = Math.floor(col / 3) * 3;
          for (var j = 0; j < 3; j++) {
            for (var h = 0; h < 3; h++) {
              if((sectRow + j != row) && (sectCol + h != col))
              candArrRowStr += candArr[sectRow + j][sectCol + h];
            }
          }
          
          
          for(var w = 0; w< 9; w++){
            if(w != row){
              candArrRowStr += candArr[w][col];
            }
          }
          
         // console.log(candArrRowStr)
         // console.log(candArrOne[x])
         // console.log(candArrRowStr.indexOf(candArrOne[x]))
          
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
               //console.log(row + " yo " + col);
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
              x = 999;
            }
           
          }
           
        }
       
      }
     }
  }
  }

function randCand(){
   for (var row = 0; row < 9; row++) {
     var counter = 0;
      for (var col = 0; col < 9; col++) {
      if(matrix[row][col] == 0){
        counter++;
      } 
      }
     // var c = Object.assign([], matrix);
     
    // var bckpMatrixRow = matrix[row].slice(0);
     if (counter == 2){
        
       
       var counter2 = 0;
       for (var col2 = 0; col2 < 9; col2++) {
      if(matrix[row][col2] == 0){
        if(counter2 == 0){
          matrix[row][col2] = +candArr[row][col2][1];
          candArr[row][col2] = 'solv'
        }
        else{
          matrix[row][col2] = +candArr[row][col2][0];
          candArr[row][col2] = 'solv'
        }
        counter2++;   
      } 
      }  
       for (var step = 0; step< 3; step++){
  
  

  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderHor();
 
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
  hiddenFinderVert();
    singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderSq();
  
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
}
       var testCheck = test();
       console.log(testCheck);
       if(testCheck == 405) { 
         return matrix;
       }
       else {
         console.log('false');
         //matrix = Object.assign([], clone);
       }
       //теперь вызвать все остальные функции
       // вызвать функцию проверки верности. если она не проходит, то поменять местами
       
       
       
     }
      }
  
}
  
  function randCandVert(){
   for (var col = 0; col < 9; col++) {
     var counter = 0;
      for (var row = 0; row < 9; row++) {
      if(matrix[row][col] == 0){
        counter++;
      } 
      }
     // var c = Object.assign([], matrix);
     
    // var bckpMatrixRow = matrix[row].slice(0);
     if (counter == 2){
        
       
       var counter2 = 0;
       for (var row2 = 0; row2 < 9; row2++) {
      if(matrix[row2][col] == 0){
        if(counter2 == 0){
          matrix[row2][col] = +candArr[row2][col][1];
          candArr[row2][col] = 'solv'
        }
        else{
          matrix[row2][col] = +candArr[row2][col][0];
          candArr[row2][col] = 'solv'
        }
        counter2++;   
      } 
      }  
       for (var step = 0; step< 3; step++){
  
  

  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderHor();
 
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
  hiddenFinderVert();
    singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderSq();
  
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
}
       var testCheck = test();
       console.log(testCheck);
       if(testCheck == 405) { 
         return matrix;
       }
       else {
         console.log('false');
         //matrix = Object.assign([], clone);
       }
       //теперь вызвать все остальные функции
       // вызвать функцию проверки верности. если она не проходит, то поменять местами
       
       
       
     }
      }
  
}

   singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderHor();
 
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
  hiddenFinderVert();
    singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderSq();
  
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 randCand();
  randCandVert();
 
for (var step = 0; step< 3; step++){
  
  

  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderHor();
 
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
  hiddenFinderVert();
    singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  
 hiddenFinderSq();
  
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
  singleFinder();
    singleFinder();
}
 


  


  console.log(candArr);
  console.log(matrix);
  return matrix;


}

