import { useState } from "react";

export default function(){
    const [clicked, setClicked] = useState(false);
    return (
        <button 
            className={clicked ? 'hoge' : ''}
            onClick={()=>setClicked( !clicked)  }
        > 
            click
        </button>
    )
}