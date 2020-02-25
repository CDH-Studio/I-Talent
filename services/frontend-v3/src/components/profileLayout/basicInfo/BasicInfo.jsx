import React, { Component } from "react";
import BasicInfoView from "./BasicInfoView";

const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

class BasicInfo extends Component {
  render() {
    const { data } = this.props;

    const name = data.firstName + " " + data.lastName;

    return (
      <BasicInfoView
        data={data}
        avatar={{
          acr: this.getAcronym(name),
          color: this.stringToHslColor(this.getAcronym(name))
        }}
        locale={localStorage.getItem("lang")}
      />
    );
  }

  stringToHslColor(str) {
    var hash = 0;
    var s = 90;
    var l = 45;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var h = hash % 360;
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  }

  getAcronym(name) {
    const i = name.lastIndexOf(" ") + 1;
    return name.substring(0, 1) + name.substring(i, i + 1);
  }
}

export default BasicInfo;
