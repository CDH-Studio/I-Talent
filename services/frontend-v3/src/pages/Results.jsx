import React from "react";

import AppLayout from "../components/layouts/appLayout/AppLayout";

class Results extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Results | UpSkill";
  }

  render() {
    return <AppLayout>TEST!!!</AppLayout>;
  }
}

//Needed when using this,props.intl
export default Results;
