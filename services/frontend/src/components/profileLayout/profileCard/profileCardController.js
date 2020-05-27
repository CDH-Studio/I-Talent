import React, { Component } from "react";
import ProfileCardView from "./profileCardView";

/** Logic for displaying a profile card */
export default class ProfileCardController extends Component {
  render() {
    return <ProfileCardView {...this.props} />;
  }
}

ProfileCardController.defaultProps = {
  cardName: null
};
