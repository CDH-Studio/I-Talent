import React from "react";
import ProfileLayoutView from "./ProfileLayoutView";

function ProfileLayout(props) {
  const { data } = props;
  return (
    <ProfileLayoutView
      changeLanguage={props.changeLanguage}
      displaySideBar={props.displaySideBar}
      // sideBarContent={sideBarContent}
      data={data}
    />
  );
}

// Needed when using this.props.intl
export default ProfileLayout;
