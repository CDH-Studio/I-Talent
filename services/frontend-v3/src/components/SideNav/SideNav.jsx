import React from "react";
import {} from "antd";

import SideNavView from "./SideNavView";

export default class SideNav extends React.Component {
  render() {
    return (
      <SideNavView
        sideBarContent={this.props.sideBarContent}
        displaySideBar={this.props.displaySideBar}
      ></SideNavView>
    );
  }
}
