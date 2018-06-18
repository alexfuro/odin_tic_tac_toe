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
