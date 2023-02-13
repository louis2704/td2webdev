
import './App.css';
import React, { Component } from 'react';
import Shoppinglist from "./pages/Shoppinglist";

class App extends Component{
  render(){
    return(
      <div className="App">
        <Shoppinglist/>
      </div>

    );
  }
}
export default App;