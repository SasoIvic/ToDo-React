import React from 'react'
import './App.scss'
import Todos from '../pages/Todo/Todo'

const App = () => {
  return (
    <div className="root" data-test="root">
      <Todos />
    </div>
  )
}

export default App
