import React from "react";
import { Typography } from "antd";
import SideLayout from "../components/layout/SiderLayout";
import config from "../config";
import axios from "axios";
import ProfileSkeleton from "../components/profileSkeleton/ProfileSkeleton";

const backendAddress = config.backendAddress;

const { Title, Paragraph } = Typography;

class Profile extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    const id = this.props.match.params.id;

    const name = localStorage.getItem("name");
    document.title = name + " | UpSkill";

    this.updateProfileInfo = this.updateProfileInfo.bind(this);

    this.state = { name, data: null, id: id, loading: true };
  }

  componentDidUpdate() {
    const id = this.props.match.params.id;

    if (id === undefined) {
      this.goto("/secured/profile/" + localStorage.getItem("userId"));
      this.forceUpdate()
    }
  
    this.updateProfileInfo(id).then(data =>
      this.setState({ id, data, loading: false })
    );
  }

  render() {
    const { name, data, loading } = this.state;
    if (!loading)
      return (
        <SideLayout>
          <Title>{name}</Title>
          <Paragraph>{JSON.stringify(data)}</Paragraph>
        </SideLayout>
      );
    else {
      return (
        <SideLayout>
          <ProfileSkeleton />
        </SideLayout>
      );
    }
  }

  updateProfileInfo = async id => {
    const data = await axios
      .get(backendAddress + "api/private/profile/" + id)
      .then(res => res.data)
      .catch(function(error) {
        console.error(error);
      });
    return data;
  };
}

//Needed when using this.props.intl
export default Profile;
