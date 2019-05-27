import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//import componenets
import GameList from "./components/GameList";
import AddGame from "./components/AddGame";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>TB's Games</h1>
          <GameList />
          <AddGame />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
