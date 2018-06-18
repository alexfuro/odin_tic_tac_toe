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
  let name = name;
  let marker = marker;
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
