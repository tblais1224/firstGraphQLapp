import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getGameQuery } from "../queries/queries";

class GameDetailes extends Component {
  displayGameDetails() {
    const { game } = this.props.data;
    if (game) {
      return (
        <div>
          <h2>{game.name}</h2>
          <p>Genre: {game.genre}</p>
          <p>Developer: {game.developer}</p>
          <p>Publisher: {game.publisher}</p>
          <p>Designer: {game.designer.name}</p>
          <p>Platform: {game.platform.name}</p>
          <ul className="other-games-designer">
            <label>Games by {game.designer.name}:</label>
            {game.designer.games.map(game => {
              return <li key={game.id}>{game.name}</li>;
            })}
          </ul>
          <ul className="other-games-platform">
            <label>More {game.platform.name} games:</label>
            {game.platform.games.map(game => {
              return <li key={game.id}>{game.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Game selected</div>;
    }
  }

  render() {
    return <div id="game-details">{this.displayGameDetails()}</div>;
  }
}

export default graphql(getGameQuery, {
  //when props is updated this function fires
  options: props => {
    return {
      variables: {
        id: props.gameId
      }
    };
  }
})(GameDetailes);
