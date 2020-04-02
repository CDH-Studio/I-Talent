import React, { Component } from "react";
import { injectIntl } from "react-intl";

import CompetenciesView from "./CompetenciesView";

class Competencies extends Component {
  formatData() {
    const { data } = this.props;
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    let competencies = {};
    let key = 0;

    if (data.competencies) {
      data.competencies.forEach(element => {
        competencies[key] = element.description[locale];
        key++;
      });
    }

    return competencies;
  }

  render() {
    return <CompetenciesView competencies={this.formatData()} />;
  }
}

export default injectIntl(Competencies);
