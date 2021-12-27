import {useState} from "react";
import formatDate from "../function/formatDate";

export default ()=>{
    const [clock, setClock] = useState(new Date())
    const timerID = setInterval(
        () => setClock( ()=> new Date() ),
        1000
    )

    return (
        <time dateTime={ clock }>
            { formatDate( clock ) }
        </time>
    )
}