function Gameboard(){
  const board = [
    [Square(),Square(),Square()],
    [Square(),Square(),Square()],
    [Square(),Square(),Square()]
  ]
  const getBoard = () => board;
  const selectSquare = (coorX,coorY,symbol) => {
    board[coorY][coorX].markSquare(symbol)
  }
  const printBoard = () => {
    let printableBoard = board.map(row => row.map(square=>square.getValue()))
    console.log(printableBoard)}
  return {getBoard, printBoard, selectSquare}
  }

function Square(){
  let value = null
  const markSquare=(symbol)=>value=symbol
  const getValue=()=>value
  return {markSquare, getValue}
}

function GameController(playerOne,playerTwo){
  const board = Gameboard()
  const players = [
    {
      name: 'Player 1',
      symbol: 'X'
    },
    {
      name: 'Player 2',
      symbol: 'O'
    }
  ];
  let activePlayer = players[0]
  const switchActivePlayer = () => {activePlayer===players[0]? activePlayer = players[1] : activePlayer = players[0]}
  const getActivePlayer = () => activePlayer
  const printNewRound = () => {
    board.printBoard()
    console.log(`${getActivePlayer().name}'s turn`)}
  const playRound = (coorX,coorY) => {
    board.selectSquare(coorX,coorY,getActivePlayer().symbol)
    switch (true){
      case (board[coorY][0]==board[coorY][1]==board[coorY][2]):
        console.log('you win!')
        break
      case (board[0][coorX]==board[1][coorX]==board[0][coorX]):
        console.log('you win!')
        break
      case (board[1][1]!=null):
          if (board[0][0]==board[1][1]==board[2][2]){
              console.log('you win!')
              } else (board[2][0]==board[1][1]==board[0][2]) {
                console.log('you win!')
              }
        break
    }
    switchActivePlayer()
    printNewRound()
  }
  printNewRound()
  return{playRound, getActivePlayer}
}

function displayController(){
  
}

const game = GameController()
game.playRound(1,1)
game.playRound(1,2)
game.playRound(2,2)
game.playRound(0,0)
