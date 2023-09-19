import { useState } from 'react'
import './App.css'
import GreenLightRedLight from './Components/GreenLightRedLight'

function App() {

  return (
    <div>
      <GreenLightRedLight targetScore={10} gameDuration={40}/>
    </div>
  )
}

export default App
