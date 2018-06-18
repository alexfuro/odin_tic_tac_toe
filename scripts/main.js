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
      console.log(cellId);
      
    });
  };
  return true;
})();

const game = (players) => {
  let turns   = 0;
  let board   = gameBoard;

  return { players, turns, board };
};

let player1 = player("jeff","X");
let player2 = player("jane","O");
let newGame = game([player1,player2]);
