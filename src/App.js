import React from 'react';
import './App.css';
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css"
import Output from "./components/Output"
import Sidebar from './components/Sidebar';
import Header from './components/Header'


class App extends React.Component {
  constructor() {
    super()
    this.state= {
      amount: 2500,
      duration: 12,
      interest:0,
      payment: 0,
    }
    this.storeInput = this.storeInput.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  componentDidMount() {
    fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
    .then(res=> res.json())
    .then(json=> this.setState({
      amount: json.principal.amount,
      duration: json.numPayments,
      interest: json.interestRate,
      payment: json.monthlyPayment.amount})
    )
    
  }

  componentDidUpdate(prevProps, prevState) {
    if((prevState.amount!== this.state.amount)||(prevState.duration!== this.state.duration)) {
      fetch(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
      .then(res=> res.json())
      .then(json=> this.setState({  
        interest: json.interestRate,
        payment: json.monthlyPayment.amount})     
      ) 
    }  
    
  }
  storeInput() { //storing the recent input in localstorage
    const arr = [];
    if(arr.length == 0) {
      arr.push(this.state)
    }
    var getObject = JSON.parse(localStorage.getItem('keyobj'));
    if(getObject==null)
      localStorage.setItem('keyobj', JSON.stringify(arr))
    else {
      getObject.unshift(this.state)
      localStorage.setItem('keyobj', JSON.stringify(getObject))
    }      
  } 
  
  updateInput(e,clickedId) { //updating the input if the user selects a recent input from sidebar
    let obj = JSON.parse(localStorage.getItem('keyobj'))
    this.setState({
      amount: obj[clickedId].amount,
      duration: obj[clickedId].duration,
      interest: obj[clickedId].interest,
      payment: obj[clickedId].payment
    })

  }
  render() { 
  return(
    <div>
      <Header/>
      <div>
        <div className="app">
          <h5> Loan amount: ${this.state.amount}</h5>
          <InputRange
          maxValue={5000}
          minValue={500}
          value={this.state.amount}
          onChange ={amount => this.setState({amount})}
          onChangeComplete = {this.storeInput}
          />
          <h5>Loan duration: {this.state.duration} months</h5>
          <InputRange
          maxValue={24}
          minValue={6}
          value={this.state.duration}
          onChange={duration => this.setState({duration})}
          onChangeComplete = {this.storeInput}
          /> 
          <Output int ={this.state.interest} pay = {this.state.payment}/>
        </div>
        <div className = "sidebar">
          <Sidebar onclick = {(e, id) => this.updateInput(e, id)} />
        </div>
      </div>
    </div>
  )
  }
}

export default App;
