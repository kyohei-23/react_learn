import { useState, useEffect } from "react";

function CalcButton({ number, onClick }){
    return(
        <button onClick={ ()=> onClick() }>
            { number }
        </button>
    )
}

function calc(a, b, operator){
    switch(operator){
        case '+' :
            return a+b
        case '-' :
            return a-b
        case '*' :
            return a*b
        case '/' :
            return a/b
        default : 
            break;
    }
}

export function CalcBoard(){
    const [result, setResult] = useState(0);
    const [operator, setOperator] = useState('');
    const [oldNum, setOldNum] = useState(0);
    const [total, setTotal] = useState(0);

    const handleClick = ( i ) =>{
        if( typeof(i) === 'number' ){
            setResult( result * 10 + i )
        }else if(i !== '='){
            setOldNum( result )
            setResult( 0 )
            setOperator( i )
        }else{
            let _total = calc(oldNum, result, operator)
            setTotal(_total)
        }
    }

    const renderSquare =( i )=>{
        return (
            <CalcButton 
                number={ i }
                onClick={()=> handleClick( i ) }
            />
        )
    }
    return (
        <>
            <p>{ oldNum + operator + result + '=' + total }</p>
            { renderSquare(1) }
            { renderSquare(2) }
            { renderSquare(3) }
            { renderSquare(4) }
            { renderSquare(5) }
            { renderSquare(6) }
            { renderSquare(7) }
            { renderSquare(8) }
            { renderSquare(9) }
            { renderSquare('+') }
            { renderSquare('-') }
            { renderSquare('*') }
            { renderSquare('/') }
            { renderSquare('=') }
        </>
    )
}