import React, { Component } from "react";
import NavigationBarController from "../components/navigationBar/navigationBarController";

export default class ProfileGeneration extends Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <div>
        <NavigationBarController></NavigationBarController>
        <h1>Create New Profile</h1>
      </div>
    );
  }
}
