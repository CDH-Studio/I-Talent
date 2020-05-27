import React from "react";
import config from "../config";
import axios from "axios";
import ProfileSkeleton from "../components/profileSkeleton/ProfileSkeleton";
import ProfileLayout from "../components/layouts/profileLayout/ProfileLayout";

const backendAddress = config.backendAddress;

class Profile extends React.Component {
  goto = (link) => this.props.history.push(link);

  constructor(props) {
    super(props);

    const id = this.props.match.params.id;

    if (id === undefined) {
      this.goto("/secured/profile/" + localStorage.getItem("userId"));
      this.forceUpdate();
    }

    this.state = { name: "Loading", data: null, id: id, loading: true };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (this.state.data === null) {
      this.updateProfileInfo(id).then((data) =>
        this.setState({
          name: data.firstName + " " + data.lastName,
          id,
          data,
          loading: false,
        })
      );
    }
  }

  componentDidUpdate() {
    const id = this.props.match.params.id;

    if (this.state.data === null) {
      this.updateProfileInfo(id).then((data) =>
        this.setState({
          name: data.firstName + " " + data.lastName,
          id,
          data,
          loading: false,
        })
      );
    }
  }

  render() {
    const { name, data, loading } = this.state;

    document.title = name + " | UpSkill";

    if (!loading)
      return (
        <ProfileLayout
          changeLanguage={this.props.changeLanguage}
          keycloak={this.props.keycloak}
          history={this.props.history}
          name={name}
          data={data}
        />
      );
    else {
      return <ProfileSkeleton changeLanguage={this.props.changeLanguage} />;
    }
  }

  updateProfileInfo = async (id) => {
    const userID = localStorage.getItem("userId");

    //Send private data to ProfileLayout component, when current user
    //is looking at his own profile
    if (id === userID) {
      const data = await axios
        .get(backendAddress + "api/private/profile/" + id)
        .then((res) => res.data)
        .catch(function (error) {
          console.error(error);
        });

      return data;
    } else {
      //Send public data to ProfileLayout component, when current user
      //is looking at someone else profile
      const data = await axios
        .get(backendAddress + "api/profile/" + id)
        .then((res) => res.data)
        .catch(function (error) {
          console.error(error);
        });
      return data;
    }
  };
}

//Needed when using this.props.intl
export default Profile;
