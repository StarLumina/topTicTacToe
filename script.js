
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
    console.log(printableBoard)
  }
  const checkForWin = (coorX,coorY) => {
    switch (true) {
    case (board[coorY][0].getValue()==board[coorY][1].getValue()&&board[coorY][1].getValue()==board[coorY][2].getValue()):
      console.log('tomfoolery afoot')
    break
    case (board[0][coorX].getValue()==board[1][coorX].getValue()&&board[1][coorX].getValue()==board[2][coorX].getValue()):
      console.log('tomfoolery afoot')
    break
    case (board[1][1]!=null):
      if (board[0][0].getValue()==board[1][1].getValue()&&board[1][1].getValue()==board[2][2].getValue()){
        console.log('uwu')
        return true 
      } else if (board[2][0].getValue()==board[1][1].getValue()&&board[1][1].getValue()==board[0][2].getValue()){
        return true 
      }
    }
  }
  return {getBoard, printBoard, selectSquare, checkForWin}
  }

function Square(){
  let value = null
  const markSquare=(symbol)=>value=symbol
  const getValue=()=>value
  return {markSquare, getValue}
}

function GameController(playerOne,playerTwo){
  const board = Gameboard()
  const display = DisplayController()
  const tictic = Array.from(document.getElementsByClassName('square'))
  const eventListener = document.getElementById('squares')
  eventListener.addEventListener('click', event =>{ 
    console.log(event.target.dataset.x)
    game.playRound(event.target.dataset.x , event.target.dataset.y)
  })
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
    if (board.checkForWin(coorX,coorY)) console.log('as intended')
    switchActivePlayer()
    display.updateDisplay(tictic , board.getBoard().flat(Infinity))
    printNewRound()
  }
  printNewRound()
  return{playRound, getActivePlayer}
}

function DisplayController(){
  const updateDisplay = (display,board) => {
    for (let i=0; i < 9 ;i++) {
      display[i].textContent=board[i].getValue()
    }
  }
  return {updateDisplay}
}

const game = GameController()



