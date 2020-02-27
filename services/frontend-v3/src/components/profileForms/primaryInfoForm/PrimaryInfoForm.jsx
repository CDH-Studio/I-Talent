import React from "react";

import PrimaryInfoFormView from "./PrimaryInfoFormView";
import axios from "axios";
import config from "../../../config";
const { backendAddress } = config;

export default class PrimaryInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationOptions: []
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

  // run once component has mounted
  async componentDidMount() {
    let locations = await this.getLocations();
    this.setState({ locationOptions: locations });
  }

  render() {
    return <PrimaryInfoFormView locationOptions={this.state.locationOptions} />;
  }
}
