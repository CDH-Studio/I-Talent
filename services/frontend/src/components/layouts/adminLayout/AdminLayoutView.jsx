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
import AppLayout from "../appLayout/AppLayout";
import availableTypes from "./adminLayoutTypes";

/**
 *  AdminLayoutView(props)
 *  Render the layout for the Admin Side.
 */
const AdminLayoutView = ({ type, displaySideBar, children }) => {
  const history = useHistory();

  // get corresponding page key based on table type
  const getPageKey = () => {
    if (availableTypes.includes(type)) {
      return type;
    }

    return null;
  };

  // send to corresponding page based on page key
  const navigationPages = ({ key }) => {
    if (availableTypes.includes(key)) {
      history.push(`/admin/${key}`);
    }
  };

  const sideBarContent = (
    <Menu onClick={navigationPages} selectedKeys={getPageKey()}>
      <Menu.Item key="dashboard" tabIndex={0}>
        <DashboardOutlined />
        <FormattedMessage id="admin.dashboard" />
      </Menu.Item>
      <Menu.Item key="users" tabIndex={0}>
        <SolutionOutlined />
        <FormattedMessage id="admin.user.plural" />
      </Menu.Item>
      <Menu.Item key="categories" tabIndex={0}>
        <AppstoreAddOutlined />
        <FormattedMessage id="admin.category.plural" />
      </Menu.Item>
      <Menu.Item key="skills" tabIndex={0}>
        <ToolOutlined />
        <FormattedMessage id="admin.skill.plural" />
      </Menu.Item>
      <Menu.Item key="competencies" tabIndex={0}>
        <FlagOutlined />
        <FormattedMessage id="admin.competency.plural" />
      </Menu.Item>
      <Menu.Item key="diplomas" tabIndex={0}>
        <TrophyOutlined />
        <FormattedMessage id="admin.diploma.plural" />
      </Menu.Item>
      <Menu.Item key="schools" tabIndex={0}>
        <BankFilled />
        <FormattedMessage id="admin.school.plural" />
      </Menu.Item>
    </Menu>
  );

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar={displaySideBar}>
      {children}
    </AppLayout>
  );
};

AdminLayoutView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(availableTypes).isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminLayoutView;
