import React from "react";
import { Typography } from "antd";
import SideLayout from "../components/layout/SiderLayout";

const { Paragraph } = Typography;

class Profile extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    this.state = { str: localStorage.getItem("name") };
    document.title = this.state.name + " | UpSkill";
  }

  onChange = str => {
    console.log("Content change:", str);
    this.setState({ str });
  };

  render() {
    return (
      <SideLayout>
        <Paragraph editable={{ onChange: this.onChange }}>
          {this.state.str}
        </Paragraph>
      </SideLayout>
    );
  }
}

//Needed when using this,props.intl
export default Profile;
