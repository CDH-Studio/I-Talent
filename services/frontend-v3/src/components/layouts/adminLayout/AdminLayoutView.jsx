import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  SolutionOutlined,
  AppstoreAddOutlined,
  ToolOutlined,
  FlagOutlined
} from "@ant-design/icons";
import TopNav from "../appLayout/topNav/TopNav";
import SideNav from "../../sideNav/SideNav";
import { injectIntl } from "react-intl";

const { Content } = Layout;

function AdminLayoutView(props) {
  const { type } = props;

  let history = useHistory();

  const styles = {
    content: {
      padding: "20px 15px",
      margin: 0,
      minHeight: 280
    }
  };

  const getPageKey = () => {
    let key = null;
    if (type === "dashboard") {
      key = ["1"];
    } else if (type === "user") {
      key = ["2"];
    } else if (type === "category") {
      key = ["3"];
    } else if (type === "skill") {
      key = ["4"];
    } else if (type === "competency") {
      key = ["5"];
    }
    return key;
  };

  const navigationPages = key => {
    // Make secured:
    if (key === "1") {
      history.push("/admin/dashboard");
    } else if (key === "2") {
      history.push("/admin/users");
    } else if (key === "3") {
      history.push("/admin/categories");
    } else if (key === "4") {
      history.push("/admin/skills");
    } else if (key === "5") {
      history.push("/admin/competencies");
    }
  };

  const sideBarContent = () => {
    return (
      <Menu
        defaultSelectedKeys={getPageKey()}
        mode="inline"
        onClick={({ key }) => {
          navigationPages(key);
        }}
      >
        <Menu.Item key="1">
          <DashboardOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.dashboard",
              defaultMessage: "Dashboard"
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <SolutionOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.user.plural",
              defaultMessage: "Users"
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="3">
          <AppstoreAddOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.category.plural",
              defaultMessage: "Categories"
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="4">
          <ToolOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.skill.plural",
              defaultMessage: "Skills"
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="5">
          <FlagOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.competency.plural",
              defaultMessage: "Competencies"
            })}
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Layout>
      {/* Render Top Navigation Bar */}
      <TopNav
        changeLanguage={props.changeLanguage}
        keycloak={props.keycloak}
        history={props.history}
      ></TopNav>
      <Layout>
        {/* Render Side Navigation Bar */}
        <SideNav
          sideBarContent={sideBarContent()}
          displaySideBar={props.displaySideBar}
        ></SideNav>
        {/* Render content */}
        <Layout>
          <Content style={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default injectIntl(AdminLayoutView);
