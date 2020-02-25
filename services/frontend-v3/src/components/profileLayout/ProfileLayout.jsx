import React from "react";
import BasicInfo from "./basicInfo/BasicInfo";
import Skills from "./skills/Skills";
class Profile extends React.Component {
  render() {
    const { name, data } = this.props;
    console.log(data);

    return (
      <div>
        <BasicInfo name={name} data={data} change />
        <Skills data={data} />
      </div>
    );
  }
}

//Needed when using this.props.intl
export default Profile;
