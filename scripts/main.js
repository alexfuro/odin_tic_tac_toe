const gameBoard = (() => {
  const create = () => {
    let contents = [];
    for(let i = 0; i < 9; i++){
      contents.push("");
    };
    return contents;
  };
  return create();
})();

const player = (name, marker) => {
  const move = (board, cellPos) => {
    if (board[cellPos] == ""){
      board[cellPos] = marker;
      return true;
    } else {
      return false;
    };
  };
  return { name, marker, move }
};

const gridGenerator = (() => {
  let gameGrid = document.getElementById("gameBoardHTML");
  for(let i = 0; i < 9; i++){
    cell = document.createElement("span");
    cell.setAttribute("id","cell-" + i);
    cell.setAttribute("class", "cell");
    gameGrid.appendChild(cell);
  };
  return true;
})();


const displayController = (() => {
  const display = (board) => {
    let cells = document.getElementsByClassName("cell");
    for(let index = 0; index < 9; index++){
      cells[index].innerText = board[index];
    };
    return true;
  };
  return { display };
})();

const addClickEvents = (() => {
  let cells = document.getElementsByClassName("cell");
  for(let index = 0; index < 9; index++){
    cells[index].addEventListener("click",function(){
      let cellId = this.id[5];
      newGame.move(cellId);
    });
  };
  return true;
})();

const game = (players) => {
  let turns    = 0;
  let board    = gameBoard;
  let gameOver = false;

  const move = (cellId) => {
    let newMove = players[turns%2].move(board, cellId);
    displayController.display(board);
    if (newMove) {
      gameOver = checkWinner();
      if (gameOver) {
        displayResult(`${players[turns%2].name} won!`);
      }else if ( turns > 7) {
        displayResult("its a tie");
      }
      turns++;
    };
  };

  //helper method for checkWinner
  const checkMark   = (currentMark) => {
    let playerMarker = players[turns%2].marker;

    return currentMark == playerMarker;
  };

  const checkWinner = () => {
    //check columns for a winner;
    let column1 = [board[0],board[3],board[6]];
    let column2 = [board[1],board[4],board[7]];
    let column3 = [board[2],board[5],board[8]];

    if (column1.every(checkMark)) {
      return true;
    } else if (column2.every(checkMark)) {
      return true;
    } else if (column3.every(checkMark)) {
      return true;
    }

    //check rows for winner
    let row1 = [board[0],board[1],board[2]];
    let row2 = [board[3],board[4],board[5]];
    let row3 = [board[6],board[7],board[8]];

    if (row1.every(checkMark)) {
      return true;
    } else if (row2.every(checkMark)) {
      return true;
    } else if (row3.every(checkMark)) {
      return true;
    }
    //check diagonals for winner
    let diag1 = [board[0],board[4],board[8]];
    let diag2 = [board[2],board[4],board[6]];


    if (diag1.every(checkMark)) {
      return true;
    } else if (diag2.every(checkMark)) {
      return true;
    }

    return false;
  }
  const displayResult = (result) => {
    let resultHTML = document.getElementById('resultHTML');
    resultHTML.innerText = result;
    return true;
  };

  return { players, turns, board, move };
};

let player1 = player("jeff","X");
let player2 = player("jane","O");
let newGame = game([player1,player2]);
