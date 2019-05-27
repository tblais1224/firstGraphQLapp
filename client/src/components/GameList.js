import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getGamesQuery } from "../queries/queries";
import GameDetails from "./GameDetailes"

class GameList extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        this.setState({ selected: e.target.id });
    }

  displayGames() {
    //this.props is the gql response
    let data = this.props.data;
    //check if request is loading
    if (data.loading) {
      return <div>Loading Game...</div>;
    } else {
      return data.games.map(game => {
        return <li onClick={this.onClick} id={game.id}>{game.name}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <ul className="game-list">{this.displayGames()}</ul>
        <GameDetails gameId={this.state.selected}/>
      </div>
    );
  }
}
export default graphql(getGamesQuery)(GameList);
