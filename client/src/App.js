import React, { Component } from "react";

//import componenets
import GameList from "./components/GameList";

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>TB's Games</h1>
        <GameList />
      </div>
    );
  }
}

export default App;
