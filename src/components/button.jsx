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
            ダークモード
            <button 
                className={`toggle-btn ${clicked ? 'active' : ''}`}
                onClick={()=>setClicked( !clicked)  }
            > 
                <span className="toggle-btn-body"></span>
            </button>
        </label>
    )
}