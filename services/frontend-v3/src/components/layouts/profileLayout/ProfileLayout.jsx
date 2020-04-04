import React from "react";
import ProfileLayoutView from "./ProfileLayoutView";

function ProfileLayout(props) {
  const data = props.data;
  return (
    <ProfileLayoutView
      changeLanguage={props.changeLanguage}
      displaySideBar={props.displaySideBar}
      // sideBarContent={sideBarContent}
      data={data}
    ></ProfileLayoutView>
  );
}

//Needed when using this.props.intl
export default ProfileLayout;
