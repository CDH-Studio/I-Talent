import React, { Component } from "react";
import { Affix, Layout, Divider, Dropdown, Menu, Icon } from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { FormattedMessage } from "react-intl";

const { Header } = Layout;

export default class TopNavView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const menu = (
      <Menu style={styles.dropDownMenu}>
        <Menu.Item style={styles.dropDownItem}>
          <a target="_blank" rel="noopener noreferrer" href="#">
            <Icon type="user" style={styles.MenuIcon} />
            View Profile
          </a>
        </Menu.Item>
        <Menu.Item style={styles.dropDownItem}>
          <a target="_blank" rel="noopener noreferrer" href="#">
            <Icon type="edit" style={styles.MenuIcon} />
            Edit Profile
          </a>
        </Menu.Item>
        <Menu.Item style={styles.dropDownItem}>
          <a
            rel="noopener noreferrer"
            onClick={() => {
              this.props.history.push("/");
              this.props.keycloak.logout();
            }}
          >
            <Icon type="logout" style={styles.MenuIcon} />
            <FormattedMessage id="sign.out" />
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Affix offsetTop={this.state.top}>
        <Header style={styles.header} className="shadow">
          <div style={styles.rightMenu}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
                style={{ color: "#000", padding: "20px 15px" }}
              >
                <CustomAvatar style={styles.profileAvatar}></CustomAvatar>
                {localStorage.getItem("name")} <Icon type="down" />
              </a>
            </Dropdown>
            <Divider type="vertical" style={styles.divider} />
            <ChangeLanguage changeLanguage={this.props.changeLanguage} />
          </div>
        </Header>
      </Affix>
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
    marginRight: "8px"
  },
  divider: {
    verticalAlign: "middle",
    marginRight: "25px"
  },
  dropDownMenu: {
    marginTop: "0",
    padding: "0"
  },
  dropDownItem: {
    padding: "10px 20px"
  },
  MenuIcon: {
    marginRight: "10px"
  }
};

//Needed when using this,props.intl
//export default injectIntl(TopNavView);
