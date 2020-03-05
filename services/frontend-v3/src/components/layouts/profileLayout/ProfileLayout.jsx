import React from "react";
import ProfileLayoutView from "./ProfileLayoutView";

class ProfileLayout extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <ProfileLayoutView
        changeLanguage={this.props.changeLanguage}
        displaySideBar={this.props.displaySideBar}
        // sideBarContent={sideBarContent}
        data={data}
      ></ProfileLayoutView>
    );
  }
}

//Needed when using this.props.intl
export default ProfileLayout;
