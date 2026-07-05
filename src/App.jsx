import { useState } from 'react'
import './App.scss'
import Game from './components/Game.jsx'

function App() {

  return (
    <>
      <h1>HeartSweeper</h1>
      <div style = {{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Game />
      </div>
      
    </>
  )
}

export default App
