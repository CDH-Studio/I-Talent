import React, { Component } from "react";
import BasicInfoView from "./BasicInfoView";

const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

class BasicInfo extends Component {
  render() {
    const { name, data } = this.props;

    return (
      <BasicInfoView
        name={name}
        data={data}
        avatar={{
          acr: this.getAcronym(name),
          color: colorList[this.letterMod(name.charAt(0))]
        }}
        locale={localStorage.getItem("lang")}
      />
    );
  }

  getAcronym(name) {
    const i = name.lastIndexOf(" ") + 1;
    return name.substring(0, 1) + name.substring(i, i + 1);
  }

  letterMod(char) {
    return char.charCodeAt(0) % colorList.length;
  }
}

export default BasicInfo;
