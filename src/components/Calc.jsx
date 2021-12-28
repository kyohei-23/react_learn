import { useState, useEffect } from "react";

function CalcButton({ value, onClick }){
    return(
        <button onClick={ ()=> onClick() }>
            { value }
        </button>
    )
}

function calc(a, b, operator){
    if(!(a || operator)) return b
    switch(operator){
        case '+' :
            return a+b
        case '-' :
            return a-b
        case '*' :
            return a*b
        case '/' :
            if(a && b){
                return a/b
            }else if(!(a || b)){
                window.alert('結果が定義されていません')
                return 0
            }else if(b === 0){
                window.alert('0で割ることはできません。')
                return  0
            }else{
                return b
            }
            
        default : 
            break;
    }
}

function CalcButtons({current ,setCurrent}){
    
    const handleClick =( i ) =>{
        setCurrent( current* 10 + i )
    }

    const renderSquare =( i )=>{
        return (
            <CalcButton 
                value={ i }
                onClick={()=> handleClick( i ) }
            />
        )
    }
    return (
        <>
            { renderSquare(1) }
            { renderSquare(2) }
            { renderSquare(3) }
            { renderSquare(4) }
            { renderSquare(5) }
            { renderSquare(6) }
            { renderSquare(7) }
            { renderSquare(8) }
            { renderSquare(9) }
            { renderSquare(0) }
        </>
    )
}


function OperatorButtons({setOperator}){

    const handleClick = ( str )=>{
        setOperator(str)
    }

    const renderSquare =( str )=>{
        return (
            <CalcButton 
                value={ str }
                onClick={()=> handleClick( str ) }
            />
        )
    }
    return(
        <>
            {renderSquare('+')}
            {renderSquare('-')}
            {renderSquare('*')}
            {renderSquare('/')}
        </>
    )
}

export function CalcBoard(){
    const [current, setCurrent] = useState(0);
    const [operator, setOperator] = useState('');
    const [oldNum, setOldNum] = useState(0);
    const [results, setResults ] = useState([]);
    
    useEffect(() => {
        current && setOldNum(current)
        setCurrent(0)
    }, [ operator ]);
    
    const calcResult =()=>{
        let _result = calc(oldNum, current, operator)
        setResults([...results, _result])
        setOldNum(_result)
        setCurrent(0)
    }
    return(
        <>
            <ul>{ results.map(num=><li key={num} onClick={()=> setOldNum(num) }>{ num }</li>) }</ul>
            <span>{oldNum}</span>
            <p>{ operator+current }</p>
            <CalcButtons
                current = { current }
                setCurrent = { setCurrent }
            />
            <OperatorButtons
                setOperator = { setOperator }
            />
            <CalcButton
                value="="
                onClick={calcResult}
            />
        </>
    )
}