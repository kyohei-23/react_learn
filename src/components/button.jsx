import { useState, useEffect } from "react";

export default function(){
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        return () => {
            document.body.classList.toggle('dark')
        };
    }, [clicked]);
    return (
        <label>
            { clicked ? '通常' : 'ダーク' }モードに変更
            <button 
                className={`toggle-btn ${clicked ? 'active' : ''}`}
                onClick={()=>setClicked( !clicked)  }
            > 
                <span className="toggle-btn-body"></span>
            </button>
        </label>
    )
}