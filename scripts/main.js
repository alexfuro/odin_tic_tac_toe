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
    if (!gameOver) {
      let newMove = players[turns%2].move(board, cellId);
      displayController.display(board);
      if (newMove) {
        gameOver = checkWinner();
        if (gameOver) {
          displayResult(`${players[turns%2].name} won!`);
          setUp().displayRematch();
        }else if ( turns > 7) {
          displayResult("its a tie");
          setUp().displayRematch();
        }
        turns++;
        displayTurn();
      };
    }
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
    let resultHTML = document.getElementById("resultHTML");
    resultHTML.innerText = result;
    return true;
  };

  const displayTurn = () => {
    let turnHTML = document.getElementById("turnHTML");
    turnHTML.innerText = `${players[turns%2].name}'s turn!`;
    return true;
  };
  //initial displayTurn
  displayTurn();
  return {  move };
};

const setUp = () => {
  const getPlayerNames = () => {
    let player1Name = document.getElementsByName("player1Name")[0].value;
    let player2Name = document.getElementsByName("player2Name")[0].value;
    return [player1Name, player2Name]
  };
  const createPlayers = (playerNames) => {
    let player1 = player(playerNames[0],"X");
    let player2 = player(playerNames[1],"O");
    return [player1, player2];
  };
  const showGame = () =>{
    let game = document.getElementsByClassName("game")[0];
    game.removeAttribute("class","hidden");
    game.setAttribute("class","show");
  };
  const hideSetUpModal = () => {
    let setUpModal = document.getElementsByClassName("modal-setup")[0];
    setUpModal.setAttribute("class","hidden");
  };
  const displayRematch = () => {
    let rematchBtn = document.getElementsByTagName("form")[0];
    rematchBtn.setAttribute("class","show");
    return true;
  };
  const createGame = () => {
    let players = createPlayers(getPlayerNames());
    newGame = game(players);
    if(newGame){
      hideSetUpModal();
      showGame();
    };
    return true;
  };
  if (newGame == null) {
    createGame();
  };
  return { displayRematch };
};

let newGame = null;
