
import './App.css';
import React from 'react';
import Die from './Die.js'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import {v4 as uuid} from 'uuid'
function App() {

  const [die,setDie]=React.useState(random())
  const [win,setWin]=React.useState(false)
  const [rollCount,setRollCount]=React.useState(0)
 
  


  function random(){
    const arr=[]
    for(var i=0;i<10;i++){
      arr.push({value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:uuid()
      })
    }
    return arr;
  }

 function holdDice(id){
  
  const arr=die.map((die)=>{
    return die.id===id?{...die,
      isHeld:!die.isHeld}:die
  })
  setDie(arr)
 }

  function rollDice(){
   
    const arr=die.map((die)=>{
      return die.isHeld?die:{
        ...die,
        value:Math.ceil(Math.random()*6)
      }
    })
    setRollCount((pre)=>{
      return ++pre
    })
    setDie(arr)
  }

  React.useEffect(()=>{
  const allHold=die.every((die)=>die.isHeld)
  const no=die[0].value
  const allSame=die.every((die)=>die.value===no)
  if(allSame && allHold){
    console.log('win')
    
    setWin(true)

  }
  
  },[die])

 
  function tryAgain(){
    const arr=random()
    setDie(arr)
    setWin(false)
    setRollCount(0)
    console.log('try')
  }
 

 const [windowDimension, setDimension]= React.useState({width: window.innerWidth, height: window.innerHeight})
 const detectSize=()=>{
  setDimension({width: window.innerWidth, height: window.innerHeight})

 }
 React.useEffect(()=>{
  window.addEventListener('resize',detectSize)
  return()=>{
    window.removeEventListener('resize',detectSize)
  }
 },[windowDimension])
  return (
    <div className="App">
      {win && <Confetti width={windowDimension.width} height={windowDimension.height}/>}
      <div className='header'>
      <h1>Tenzies</h1>
      <h3>Roll untill all dice are the same. <br></br> Click each die to freeze <br></br> at it at its current value between rolls.</h3>
      </div>
      <div className='dice-container'>
          {die.map((die)=>{
            return <Die value={die} change={holdDice} />
            
          })}
        
      </div>
      <div className='roll-count'>
        <h3>Roll Count : {rollCount}</h3>
       
      </div>
      <div className='btn'>
        {
          win?
      <button onClick={tryAgain }>Try Again</button>:<button onClick={rollDice} >Roll</button>
        }
      </div>
     

    </div>
  );
}

export default App;
