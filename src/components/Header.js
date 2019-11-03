import React from 'react'
import '../App.css'

function Header(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
	  <div className="container d-flex justify-content-center">
	    <h1 className="navbar-brand">
		  Loan Payment Calcuator
		</h1>
	  </div>
	</nav>
  );
}
export default Header