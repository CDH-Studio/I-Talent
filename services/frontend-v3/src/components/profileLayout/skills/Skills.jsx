import React, { Component } from "react";
import SkillsView from "./SkillsView";

class Skills extends Component {
  render() {
    const { data } = this.props;

    return <SkillsView data={data} />;
  }
}

export default Skills;
