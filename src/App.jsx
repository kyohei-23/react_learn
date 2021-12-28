import { useState } from 'react'
import './App.css'
import Button from './components/button';
import { CalcBoard } from './components/Calc';
import Clock from './components/Clock';

function Hello({ name }){
  return <h2> Hello,{ name } </h2>
}

function App() {
  const [count, setCount] = useState(0)

  const hoge = <h1>Hello,world!{ count }</h1>
  return (
    <>
      { hoge }
      <Button /><br/>
      <Clock />
      <Hello name="hoge" />
      <Hello name="huga" />
      <p>{ count }</p>
      <button onClick={ ()=> setCount( count + 1 ) }
      >
        incliment
      </button>
      <CalcBoard />
    </>
  )
}

export default App
