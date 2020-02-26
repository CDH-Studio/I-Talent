import React from "react";
import prepareInfo from "../../functions/prepareInfo";
import axios from "axios";
import {} from "antd";
import config from "../../config";

import SearchBarView from "./SearchBarView";
const backendAddress = config.backendAddress;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedOptions: null
    };
    this.getAdvancedOptions = this.getAdvancedOptions.bind(this);
  }

  async getAdvancedOptions() {
    const lang = localStorage.getItem("lang");
    let advancedOptions = {
      classification: prepareInfo(
        (await axios.get(backendAddress + "api/option/getGroupLevel")).data,
        lang
      ).map(obj => ({
        key: obj.id,
        text: obj.description,
        value: obj.id
      })),
      skills: prepareInfo(
        (await axios.get(backendAddress + "api/option/getDevelopmentalGoals"))
          .data,
        lang
      ).map(obj => ({
        key: obj.id,
        text: obj.description,
        value: obj.id
      })),
      location: prepareInfo(
        (await axios.get(backendAddress + "api/option/getLocation")).data,
        lang
      ).map(obj => ({
        key: obj.id,
        text: obj.description,
        value: obj.id
      })),
      branch: (await axios.get(backendAddress + "api/option/getBranch")).data
        .filter(elem => elem.description && elem.description.en)
        .map(obj => ({
          key: obj.description.en,
          text: obj.description[lang],
          value: obj.description.en
        }))
    };
  }

  render() {
    return (
      <SearchBarView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        getAdvancedOptions={this.getAdvancedOptions}
      ></SearchBarView>
    );
  }
}
export default SearchBar;
