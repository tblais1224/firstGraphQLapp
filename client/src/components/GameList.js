import React, { Component } from "react";
import { graphql } from "react-apollo";
import {getGamesQuery} from "../queries/queries"

class GameList extends Component {

  displayGames() {
    //this.props is the gql response
    let data = this.props.data;
    //check if request is loading
    if (data.loading) {
      return <div>Loading Game...</div>;
    } else {
      return data.games.map(game => {
        return <li>{game.name}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="game-list">{this.displayGames()}</ul>
      </div>
    );
  }
}
export default graphql(getGamesQuery)(GameList);
