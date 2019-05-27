import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getDesignersPlatformsQuery,
  addGameMutation,
  getGamesQuery
} from "../queries/queries";

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      developer: "",
      publisher: "",
      designerId: "",
      platformId: ""
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addGameMutation({
      //sends variables to the queries file
      variables: {
        name: this.state.name,
        publisher: this.state.publisher,
        developer: this.state.developer,
        genre: this.state.genre,
        designerId: this.state.designerId,
        platformId: this.state.platformId
      },
      //after submit fetches new games list
      refetchQueries: [{ query: getGamesQuery }]
    });
  }

  displayDesigners() {
    let data = this.props.getDesignersPlatformsQuery;
    if (data.loading) {
      return <option disabled>Loading Designers...</option>;
    } else {
      return data.designers.map(designer => {
        return (
          <option key={designer.id} value={designer.id}>
            {designer.name}
          </option>
        );
      });
    }
  }
  displayPlatforms() {
    let data = this.props.getDesignersPlatformsQuery;
    if (data.loading) {
      return <option disabled>Loading Platforms...</option>;
    } else {
      return data.platforms.map(platform => {
        return (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <form id="add-game" onSubmit={this.submitForm}>
        <div className="field">
          <label>Game Name: </label>
          <input type="text" name="name" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Game Developer: </label>
          <input type="text" name="developer" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Game Publisher: </label>
          <input type="text" name="publisher" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Game Genre: </label>
          <input type="text" name="genre" onChange={this.onChange} />
        </div>
        <div className="field">
          <label>Game Designer: </label>
          <select name="designerId" onChange={this.onChange}>
            <option>Select Designer</option>
            {this.displayDesigners()}
          </select>
        </div>
        <div className="field">
          <label>Game Platform: </label>
          <select name="platformId" onChange={this.onChange}>
            <option>Select Platform</option>
            {this.displayPlatforms()}
          </select>
        </div>
        <button type="submit">Add Game</button>
      </form>
    );
  }
}

export default compose(
  graphql(getDesignersPlatformsQuery, { name: "getDesignersPlatformsQuery" }),
  graphql(addGameMutation, { name: "addGameMutation" })
)(AddGame);
