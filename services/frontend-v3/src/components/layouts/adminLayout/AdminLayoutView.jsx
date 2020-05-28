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
  BankFilled,
} from "@ant-design/icons";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import { IntlPropType } from "../../../customPropTypes";
import AppLayout from "../appLayout/AppLayout";

/**
 *  AdminLayoutView(props)
 *  Render the layout for the Admin Side.
 */
const AdminLayoutView = (props) => {
  const { type, intl, keycloak, displaySideBar, children } = props;

  const history = useHistory();

  /* get corresponding page key based on table type */
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
    } else if (type === "school") {
      key = ["7"];
    }
    return key;
  };

  /* send to corresponding page based on page key */
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
    } else if (key === "7") {
      history.push("/admin/school");
    }
  };

  /* Sets up the side bar for the Admin Side */
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
            {intl.formatMessage({
              id: "admin.dashboard",
              defaultMessage: "Dashboard",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <SolutionOutlined />
          <span>
            {intl.formatMessage({
              id: "admin.user.plural",
              defaultMessage: "Users",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="3">
          <AppstoreAddOutlined />
          <span>
            {intl.formatMessage({
              id: "admin.category.plural",
              defaultMessage: "Categories",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="4">
          <ToolOutlined />
          <span>
            {intl.formatMessage({
              id: "admin.skill.plural",
              defaultMessage: "Skills",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="5">
          <FlagOutlined />
          <span>
            {intl.formatMessage({
              id: "admin.competency.plural",
              defaultMessage: "Competencies",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="6">
          <TrophyOutlined />
          <span>
            {intl.formatMessage({
              id: "admin.diploma.plural",
              defaultMessage: "Diplomas",
            })}
          </span>
        </Menu.Item>
        <Menu.Item key="7">
          <BankFilled />
          <span>
            {intl.formatMessage({
              id: "admin.school.plural",
              defaultMessage: "Schools",
            })}
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  /* Uses the AppLayout */
  return (
    <AppLayout
      keycloak={keycloak}
      history={history}
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent()}
    >
      {children}
    </AppLayout>
  );
};

AdminLayoutView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    "dashboard",
    "user",
    "category",
    "skill",
    "competency",
    "diploma",
    "school",
  ]).isRequired,
  children: PropTypes.node.isRequired,
  intl: IntlPropType,
  keycloak: PropTypes.instanceOf(Keycloak),
};

AdminLayoutView.defaultProps = {
  intl: undefined,
  keycloak: undefined,
};

export default injectIntl(AdminLayoutView);
