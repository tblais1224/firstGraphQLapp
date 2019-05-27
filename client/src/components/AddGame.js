import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getDesignersPlatformsQuery } from "../queries/queries";

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
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayDesigners() {
    let data = this.props.data;
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
    let data = this.props.data;
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
    console.log(this.props);
    return (
      <form id="add-game">
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
      </form>
    );
  }
}
export default graphql(getDesignersPlatformsQuery)(AddGame);
