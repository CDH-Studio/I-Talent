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

  // get user profile for form drop down
  async getProfileInfo() {
    try {
      let url =
        backendAddress + "api/profile/" + localStorage.getItem("userId");
      let result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // run once component has mounted
  async componentDidMount() {
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
