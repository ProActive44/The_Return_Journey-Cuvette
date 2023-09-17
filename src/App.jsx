import { useState } from 'react'
import './App.css'
import GreenLightRedLight from './Components/GreenLightRedLight'

function App() {

  return (
    <>
      <GreenLightRedLight targetScore={10} gameDuration={40}/>
    </>
  )
}

export default App
