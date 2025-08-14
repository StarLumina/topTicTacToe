
const resetButton=document.getElementById('reset')
const changeName=document.getElementById('changeName')
const modalDialog = document.getElementById('modalDialog')
const playerOneGet = document.getElementById('playerTag1Get')
const playerTwoGet = document.getElementById('playerTag2Get')
const playerOneTag = document.getElementById('playerTag1')
const playerTwoTag = document.getElementById('playerTag2')

const submit = document.getElementById('form')

changeName.addEventListener('click', ()=>modalDialog.showModal()) 

display = (function DisplayController(){
  const tictic = Array.from(document.getElementsByClassName('square'))
  const updateDisplay = (board) => {
    for (let i=0; i < 9 ;i++) {
      tictic[i].textContent=board[i].getValue()
    }
  }
  const updateScore = (playerList) => {
    let playerOneScore = document.getElementById('playerScore1')
    let playerTwoScore = document.getElementById('playerScore2')
    playerOneScore.textContent=playerList[0].score
    playerTwoScore.textContent=playerList[1].score
  }
  const updatePlayerName = (playerList) => {
    let playerOneTag = document.getElementById('playerTag1')
    let playerTwoTag = document.getElementById('playerTag2')
    playerOneTag.textContent=playerList[0].name
    playerTwoTag.textContent=playerList[1].name 
  }
  return {updateDisplay, updateScore, updatePlayerName}
})()

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
  const reset = () => board.flat(Infinity).map(square => square.markSquare(null))
  const isTaken = (coorX,coorY) => {
    return ( board[coorY][coorX].getValue() !== null )
  }
  const checkForWin = (coorX,coorY) => {
    switch (true) {
    case (board[coorY][0].getValue()==board[coorY][1].getValue()&&board[coorY][1].getValue()==board[coorY][2].getValue()):
      console.log('hrizntal errr')
      return true
    break
    case (board[0][coorX].getValue()==board[1][coorX].getValue()&&board[1][coorX].getValue()==board[2][coorX].getValue()):
      console.log('vertical errr')
      return true
    break
    case (board[1][1].getValue()!=null):
      if (board[0][0].getValue()==board[1][1].getValue()&&board[1][1].getValue()==board[2][2].getValue()){
        console.log('et tu?')
        return true 
      } else if (board[2][0].getValue()==board[1][1].getValue()&&board[1][1].getValue()==board[0][2].getValue()){
        console.log('brutus')
        return true 
      }
    }
  }
  return {getBoard, printBoard, selectSquare, checkForWin, isTaken, reset}
  }

function Square(){
  let value = null
  const markSquare=(symbol)=>value=symbol
  const getValue=()=>value
  return {markSquare, getValue}
}

function GameController(playerOne,playerTwo){
  const board = Gameboard()
  const eventListener = document.getElementById('squares')
  const players = [
    {
      name: 'Player 1',
      symbol: 'X',
      score:0,
    },
    {
      name: 'Player 2',
      symbol: 'O',
      score:0,
    }
  ];
  eventListener.addEventListener('click', event =>{ 
    playRound(event.target.dataset.x , event.target.dataset.y)
  })
  resetButton.addEventListener('click', ()=>{
    board.reset()
    display.updateDisplay(board.getBoard().flat(Infinity))
  })
  submit.addEventListener('submit',(event)=>{
    event.preventDefault()
    players[0].name=playerOneGet.value
    players[1].name=playerTwoGet.value
    display.updatePlayerName(players)
    modalDialog.close()
  })
  let activePlayer = players[0]
  const getActivePlayer = () => activePlayer
  const switchActivePlayer = () => {activePlayer===players[0]? activePlayer = players[1] : activePlayer = players[0]}
  const printNewRound = () => {
    board.printBoard()
    console.log(`${getActivePlayer().name}'s turn`)}
  const playRound = (coorX,coorY) => {
    if (board.isTaken(coorX,coorY)) return
    board.selectSquare(coorX,coorY,getActivePlayer().symbol)
    if (board.checkForWin(coorX,coorY)) {
      activePlayer.score += 1
      display.updateDisplay(board.getBoard().flat(Infinity))
      display.updateScore(players)
      switchActivePlayer()
      board.reset()
      return
    }
    switchActivePlayer()
    display.updateDisplay(board.getBoard().flat(Infinity))
    display.updateScore(players)
  }
  printNewRound()
  return{playRound}
}


const game = GameController()



