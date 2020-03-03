import React from "react";

import PrimaryInfoFormView from "./PrimaryInfoFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

export default class PrimaryInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationOptions: [],
      profileInfo: []
    };
  }

  // get possible locations for form drop down
  async getLocations() {
    try {
      let result = await axios.get(backendAddress + "api/option/getLocation");
      return result.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // get possible locations for form drop down
  async getProfileInfo() {
    console.log("helloooo");
    try {
      let url =
        backendAddress + "api/profile/" + localStorage.getItem("userId");
      let result = await axios.get(url);
      console.log("great:");
      //console.log(localStorage.getItem("userId"));
      return result;
    } catch (error) {
      console.log("error");
      console.log(error);
      return 0;
    }
  }

  // run once component has mounted
  async componentDidMount() {
    console.log("doit!");
    let locations = await this.getLocations();
    let profile = await this.getProfileInfo();
    console.log(profile);
    this.setState({ locationOptions: locations, profileInfo: profile });
  }

  render() {
    return (
      <PrimaryInfoFormView
        locationOptions={this.state.locationOptions}
        profileInfo={this.state.profileInfo}
      />
    );
  }
}
