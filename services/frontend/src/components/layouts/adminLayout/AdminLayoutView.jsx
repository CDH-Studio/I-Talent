import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  AppstoreAddOutlined,
  BankFilled,
  BugOutlined,
  DashboardOutlined,
  FlagOutlined,
  SolutionOutlined,
  ToolOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
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
        <DashboardOutlined className="mr-1" />
        <FormattedMessage id="dashboard" />
      </Menu.Item>
      <Menu.Item key="users" tabIndex={0}>
        <SolutionOutlined className="mr-1" />
        <FormattedMessage id="users" />
      </Menu.Item>
      <Menu.Item key="categories" tabIndex={0}>
        <AppstoreAddOutlined className="mr-1" />
        <FormattedMessage id="skill.categories" />
      </Menu.Item>
      <Menu.Item key="skills" tabIndex={0}>
        <ToolOutlined className="mr-1" />
        <FormattedMessage id="skills" />
      </Menu.Item>
      <Menu.Item key="competencies" tabIndex={0}>
        <FlagOutlined className="mr-1" />
        <FormattedMessage id="competencies" />
      </Menu.Item>
      <Menu.Item key="diplomas" tabIndex={0}>
        <TrophyOutlined className="mr-1" />
        <FormattedMessage id="diplomas" />
      </Menu.Item>
      <Menu.Item key="schools" tabIndex={0}>
        <BankFilled className="mr-1" />
        <FormattedMessage id="schools" />
      </Menu.Item>
      <Menu.Item key="bugs" tabIndex={0}>
        <BugOutlined className="mr-1" />
        <FormattedMessage id="user.reported.bugs" />
      </Menu.Item>
    </Menu>
  );

  return (
    <AppLayout displaySideBar={displaySideBar} sideBarContent={sideBarContent}>
      {children}
    </AppLayout>
  );
};

AdminLayoutView.propTypes = {
  children: PropTypes.node.isRequired,
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(availableTypes).isRequired,
};

export default AdminLayoutView;
