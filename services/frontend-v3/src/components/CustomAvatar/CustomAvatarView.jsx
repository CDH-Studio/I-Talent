import React, { Component } from "react";
import { Affix, Layout, Divider, Dropdown, Menu, Icon, Avatar } from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";

const { Header } = Layout;

export default class TopNavView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Avatar style={styles.profileAvatar} size="large">
        AN
      </Avatar>
    );
  }
}

const styles = {
  header: {
    background: "#fff",
    padding: 0,
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)"
  },
  rightMenu: {
    float: "right",
    margin: "0 20px"
  },
  profileAvatar: {
    verticalAlign: "middle",
    marginRight: "10px"
  },
  divider: {
    verticalAlign: "middle",
    marginRight: "10px"
  }
};
