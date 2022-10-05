import { React, useState } from "react";

import "./App.css";

function calculateWinner(square) {
  const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
          return square[a];
      }
  }
  return null;
}

function isEnd(element, index, array) {
    return element != null;
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const winner = calculateWinner(board)
  const draw = board.every(isEnd) 

  const handleClick = (index) => {
      const boardCopy = [...board]
      // Opredelit bil li klick po yacheike ili igra zakonchena
      if (draw || winner || boardCopy[index])  return null
      // Opredelit chei hod X > 0
      boardCopy[index] = xIsNext ? 'X' : 'O'
      // Obnovit state
      setBoard(boardCopy)
      setXIsNext(!xIsNext)
  }

  const erase = () => {
    setXIsNext(true)
    setBoard(Array(9).fill(null))
  }

  const startNewGame = () => {
      return (
          <button className='start_btn' onClick={erase}>Очистить поле</button>
      )
  }


  return (
      <div className="wrapper">

          { startNewGame() }

          <div className="board">
            {
                board.map((square, i) => (
                    <button  className='square' key={i} onClick={() => handleClick(i)}>{square}</button>
                ))
            }
          </div>

          <p className='game_info'>
              { winner ? 'Победитель ' + winner : draw ? 'Ничья' : 'Сейчас ходит ' + ( xIsNext ? 'X' : 'O' ) }
          </p>
      </div>
  );
}

export default App;

// ---------------------------------------------------------------------------------

