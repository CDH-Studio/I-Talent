import React from "react";
import SideNavView from "./SideNavView";

function SideNav(props) {
  return (
    <SideNavView
      sideBarContent={props.sideBarContent}
      displaySideBar={props.displaySideBar}
    ></SideNavView>
  );
}

export default SideNav;
