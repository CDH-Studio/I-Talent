import React from "react";
import BasicInfo from "./basicInfo/BasicInfo";
class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, data } = this.props;
    console.log(data);

    return (
      <div>
        <BasicInfo name={name} data={data} />
      </div>
    );
  }
}

//Needed when using this.props.intl
export default Profile;
