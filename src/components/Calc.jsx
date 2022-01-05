import { useState, useEffect } from "react";

function CalcButton({ value, onClick }){
    return(
        <button className="inline-block w-1/3 bg-gray-100 p-1 border-2 border-solid rounded-lg" onClick={ ()=> onClick() }>
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
        <div className="btn-wrapper flex justify-center flex-wrap grow">
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
        </div>
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

function LogItem({ value, onClick, deletes}){
    return (
        <li className="flex justify-between items-center p-2 mb-4 bg-slate-100 rounded-md transition-all">
            {value}
            <div className="btn-wrapper">
                <button className="btn btn-normal" onClick={ ()=> onClick() }>選択</button>
                <button className="btn btn-denger" onClick={()=> deletes() }>削除</button>
            </div>
        </li>
    )
}

export function CalcBoard(){
    const [current, setCurrent] = useState(0);
    const [operator, setOperator] = useState('');
    const [oldNum, setOldNum] = useState(0);
    const [results, setResults ] = useState([]);

    const log_limit = 10

    const log_w = document.querySelector('.log-wrapper')
    const log_w_h = log_w?.clientHeight
    
    useEffect(() => {
        if( current &&  !oldNum ){
            setOldNum(current)
            setCurrent(0)
        }
    }, [ operator ]);

    useEffect(() => {
        if(results.length > log_limit){
            const _result = results.filter((el,i)=> i >= 1)
            setResults(_result)
        }
        const log_i= document.querySelector('.log-inner')
        const log_i_h = log_i.clientHeight
        if(log_i_h > log_w_h){
            log_w.scrollTop = log_w.scrollHeight
        }
    }, [results]);
    
    const calcResult =()=>{
        let _result = calc(oldNum, current, operator)
        setResults([...results, _result])
        setOldNum(_result)
        setCurrent(0)
    }

    const delete_log =(i, option = {})=> {
        const { isAll } = option
        if(isAll){
            setOperator('')
            setResults([])
            setOldNum(0)
            setCurrent(0)
        }else{
            const _result = results.filter((el,idx)=> i != idx )
            setResults(_result)
        }
    }

    const resultItems = results.map((num,i)=>
        <LogItem key={i}
                value={num} 
                onClick={()=> setOldNum(num)}
                deletes={()=> delete_log(i)} 

        />
    )

    return (
        <div className="calcurator flex flex-col h-screen">
            <div className="log-wrapper basis-8/12 px-10 mt-10 flex overflow-y-auto">
                <ul className="log-inner w-full mt-auto mb-0 flex flex-col justify-end">
                    { resultItems }
                </ul>
            </div>
            <div className="pt-10 mb-10 basis-4/12">
                <div className="m-10 mt-0 p-10 bg-slate-50 rounded-xl text-right">
                    <span>{oldNum}</span>
                    <p>{ `${operator} ${current}` }</p>
                </div>
                <div className="flex justify-between mx-10 gap-5">
                    <CalcButtons
                        current = { current }
                        setCurrent = { setCurrent }
                    />
                    <div>
                        <OperatorButtons
                            setOperator = { setOperator }
                        />
                        <CalcButton
                            value = "="
                            onClick = { calcResult }
                        />
                        <CalcButton 
                            value="CE"
                            onClick={()=> delete_log(0, {isAll:true}) }
                        />
                        <CalcButton
                            value="C"
                            onClick={()=> setCurrent(0)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
