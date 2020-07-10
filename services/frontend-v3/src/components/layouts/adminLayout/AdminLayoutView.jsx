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
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import AppLayout from "../appLayout/AppLayout";
import availableTypes from "./adminLayoutTypes";

/**
 *  AdminLayoutView(props)
 *  Render the layout for the Admin Side.
 */
const AdminLayoutView = (props) => {
  const { type, keycloak, displaySideBar, children } = props;

  const history = useHistory();

  /* get corresponding page key based on table type */
  const getPageKey = () => {
    if (availableTypes.includes(type)) {
      return type;
    }

    return null;
  };

  /* send to corresponding page based on page key */
  const navigationPages = (key) => {
    if (availableTypes.includes(key)) {
      history.push(`/admin/${key}`);
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
        <Menu.Item key="dashboard">
          <DashboardOutlined />
          <FormattedMessage id="admin.dashboard" />
        </Menu.Item>
        <Menu.Item key="users">
          <SolutionOutlined />
          <FormattedMessage id="admin.user.plural" />
        </Menu.Item>
        <Menu.Item key="categories">
          <AppstoreAddOutlined />
          <FormattedMessage id="admin.category.plural" />
        </Menu.Item>
        <Menu.Item key="skills">
          <ToolOutlined />
          <FormattedMessage id="admin.skill.plural" />
        </Menu.Item>
        <Menu.Item key="competencies">
          <FlagOutlined />
          <FormattedMessage id="admin.competency.plural" />
        </Menu.Item>
        <Menu.Item key="diplomas">
          <TrophyOutlined />
          <FormattedMessage id="admin.diploma.plural" />
        </Menu.Item>
        <Menu.Item key="schools">
          <BankFilled />
          <FormattedMessage id="admin.school.plural" />
        </Menu.Item>
      </Menu>
    );
  };

  /* Uses the AppLayout */
  return (
    <AppLayout
      keycloak={keycloak}
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent()}
    >
      {children}
    </AppLayout>
  );
};

AdminLayoutView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(availableTypes).isRequired,
  children: PropTypes.node.isRequired,
  keycloak: PropTypes.instanceOf(Keycloak),
};

AdminLayoutView.defaultProps = {
  keycloak: undefined,
};

export default AdminLayoutView;
