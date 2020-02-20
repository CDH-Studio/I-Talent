import React, { Component } from "react";
import { Affix, Layout, Divider, Dropdown, Menu, Icon, Button } from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { FormattedMessage, injectIntl } from "react-intl";

const { Header } = Layout;

class TopNavView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props);
    const menu = (
      <Menu style={{ marginTop: "20px", padding: "0" }}>
        <Menu.Item style={{ padding: "10px 20px" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            <Icon type="user" style={{ marginRight: "10px" }} />
            View Profile
          </a>
        </Menu.Item>
        <Menu.Item style={{ padding: "10px 20px" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            <Icon type="edit" style={{ marginRight: "10px" }} />
            Edit Profile
          </a>
        </Menu.Item>
        <Menu.Item style={{ padding: "10px 20px" }}>
          <a
            rel="noopener noreferrer"
            onClick={() => {
              this.props.history.push("/");
              this.props.keycloak.logout();
            }}
          >
            <Icon type="logout" style={{ marginRight: "10px" }} />
            {this.props.intl.formatMessage({
              id: "sign.out",
              defaultMessage: "Logout"
            })}
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
                style={{ color: "#000", padding: "0 15px" }}
              >
                <CustomAvatar style={styles.profileAvatar}></CustomAvatar>
                Ali Nouri <Icon type="down" />
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
  }
};

//Needed when using this,props.intl
export default injectIntl(TopNavView);
