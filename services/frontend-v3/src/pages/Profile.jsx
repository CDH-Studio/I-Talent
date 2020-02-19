import React from "react";
import { Typography } from "antd";
import SideLayout from "../components/layout/SiderLayout";

const { Title } = Typography;

class Profile extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    this.state = { name: localStorage.getItem("name") };
    document.title = this.state.name + " | UpSkill";
  }

  render() {
    return (
      <SideLayout>
        <Title>{localStorage.getItem("name")}</Title>
      </SideLayout>
    );
  }
}

//Needed when using this,props.intl
export default Profile;
