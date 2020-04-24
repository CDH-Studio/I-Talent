import React from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  SolutionOutlined,
  AppstoreAddOutlined,
  ToolOutlined,
  FlagOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import AppLayout from "../appLayout/AppLayout";
import { injectIntl } from "react-intl";

function AdminLayoutView(props) {
  const { type } = props;

  let history = useHistory();

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
    } else if (type === "diploma") {
      key = ["6"];
    }
    return key;
  };

  const navigationPages = (key) => {
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
    } else if (key === "6") {
      history.push("/admin/diploma");
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
              defaultMessage: "Dashboard",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <SolutionOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.user.plural",
              defaultMessage: "Users",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="3">
          <AppstoreAddOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.category.plural",
              defaultMessage: "Categories",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="4">
          <ToolOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.skill.plural",
              defaultMessage: "Skills",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="5">
          <FlagOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.competency.plural",
              defaultMessage: "Competencies",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="6">
          <TrophyOutlined />
          <span>
            {props.intl.formatMessage({
              id: "admin.diploma.plural",
              defaultMessage: "Diplomas",
            })}
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={props.displaySideBar}
      sideBarContent={sideBarContent()}
    >
      {props.children}
    </AppLayout>
  );
}
export default injectIntl(AdminLayoutView);
