import React, { Component } from 'react';
import Drop from './Drop';
import './App.css';

class App extends Component {
  render() {
     let s = {
      background: "linear-gradient(rgb(170, 182, 171),rgba(90, 111, 160, 0.75)),url(American-Flag.jpg), no-repeat",
      backgroundSize: "cover"
    }
    return (
      <div className="App" style={s}>

        <Drop />
      </div>
    );
  }
}

export default App;
