import React from 'react'
import '../App.css'


function Output(props){
    return(
    <div className = "output">
    <h3>Interest : {props.int}%</h3>
    <h3>Monthly Payment: {props.pay}$</h3>
    </div>
    )
}
export default Output