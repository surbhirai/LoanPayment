import React from 'react';
import '../App.css'
import {Button} from 'react-bootstrap'

function Sidebar(props) {
  const inputList = JSON.parse(localStorage.getItem('keyobj'))
  let buttonList = []
  if (inputList!==null) {
     buttonList = inputList.map((item, index) => {
      return(
      <Button id = {index} type="button" class="list-group-item list-group-item-action" variant = "outline-secondary" onClick = {(e) => props.onclick(e, index)} > Loan Amount: ${item.amount } <br/>  Loan Duration: {item.duration} months </Button>
    )
  })
}
  const displayButtonList = []
  let counter = 0 
  while (counter < buttonList.length && counter < 10) { //displaying the last 10 inputs only
    displayButtonList[counter] = buttonList[counter]
    counter++
  }
   
  return(
    <div>
      <h3>Recent Inputs</h3>
        <div class = "row">
          <div class = "col">
            <div class="list-group">
            {displayButtonList} 
            </div>
          </div>
        </div>
    </div>
  )
}
export default Sidebar