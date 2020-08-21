import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  Row,
  Col,
  Input,
  Select,
  notification,
  Popconfirm,
  Popover,
  Tag,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  TeamOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { uniq } from "lodash";
import { Link } from "react-router-dom";
import { IntlPropType } from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import Header from "../../header/Header";
import config from "../../../utils/config";

const { Text } = Typography;

const styles = {
  unsavedText: {
    marginLeft: "10px",
    fontWeight: "normal",
    fontStyle: "italic",
    opacity: 0.5,
  },
  popoverStyle: {
    maxWidth: "630px",
  },
  adminInfo: {
    marginLeft: "8px",
    paddingRight: "10px",
  },
};

/**
 *  UserTableView(props)
 *  This component renders the user table for the Admin User Page.
 */
const UserTableView = ({
  intl,
  searchText,
  searchedColumn,
  handleApply,
  handleDropdownChange,
  profileStatusValue,
  handleSearch,
  handleReset,
  modifiedStatus,
  handleSubmitDelete,
}) => {
  let searchInput;

  const { Option } = Select;

  const { locale } = useSelector((state) => state.settings);
  const { data, loading, locale: dataLocale } = useSelector(
    (state) => state.admin.users
  );

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title, linkKey) => ({
    filterDropdown: ({
      /* eslint-disable react/prop-types */
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      /* eslint-enable react/prop-types */
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`${intl.formatMessage({
            id: "admin.search",
          })} ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <FormattedMessage id="admin.search.button" />
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          <FormattedMessage id="admin.reset.button" />
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text, record) => {
      const view =
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        );

      if (linkKey && record[linkKey]) {
        return <Link to={record[linkKey]}>{view}</Link>;
      }

      return view;
    },
  });

  /* Renders the dropdown for profile status options */
  const renderStatusDropdown = (id, status) => {
    return (
      <div>
        <Select
          defaultValue={profileStatusValue(status)}
          style={{ width: 120 }}
          onChange={(value) => {
            const user = data.find(({ key }) => key === id);
            const valueToBeSaved = value === user.status ? undefined : value;
            handleDropdownChange(valueToBeSaved, id);
          }}
        >
          <Option key="active" value="ACTIVE">
            <FormattedMessage id="admin.active" />
          </Option>
          <Option key="inactive" value="INACTIVE">
            <FormattedMessage id="admin.inactive" />
          </Option>
        </Select>
      </div>
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "admin.cancelled",
      }),
    });
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    notification.success({
      message: intl.formatMessage({
        id: "admin.success",
      }),
    });
  };

  /* Renders the apply button and confirmation prompt */
  const applyButton = () => {
    return (
      <Popconfirm
        placement="left"
        title={<FormattedMessage id="admin.update.confirm" />}
        okText={<FormattedMessage id="admin.update" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onConfirm={() => {
          handleApply()
            .then(popUpSuccesss)
            .catch((error) => handleError(error, "message"));
        }}
        onCancel={() => {
          popUpCancel();
        }}
        disabled={!modifiedStatus}
      >
        <Button type="primary" disabled={!modifiedStatus}>
          <CheckCircleOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.apply" />
        </Button>
      </Popconfirm>
    );
  };

  /* Renders the keycloak button */
  const keycloakButton = () => {
    return (
      <Button href={config.manageKeycloakAddress}>
        <TeamOutlined style={{ marginRight: 10 }} />
        <FormattedMessage id="admin.manage.keycloak" />
      </Button>
    );
  };

  /* Sets up the columns for the user table */
  // Table columns data structure: array of objects

  // Consult: Ant Design table components for further clarification
  const userTableColumns = () => [
    {
      title: <FormattedMessage id="admin.name" />,
      dataIndex: "fullName",
      key: "name",
      sorter: (a, b) => {
        return a.fullName.localeCompare(b.fullName);
      },
      sortDirections: ["descend"],
      ...getColumnSearchProps(
        "fullName",
        intl.formatMessage({
          id: "admin.name",
        }),
        "profileLink"
      ),
    },
    {
      title: <FormattedMessage id="admin.job.title" />,
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => {
        return a.jobTitle.localeCompare(b.jobTitle);
      },
      ...getColumnSearchProps(
        "jobTitle",
        intl.formatMessage({
          id: "admin.job.title",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.registered" />,
      dataIndex: "formatCreatedAt",
      key: "registered",
      sorter: (a, b) => {
        return (
          moment(a.formatCreatedAt).unix() - moment(b.formatCreatedAt).unix()
        );
      },
      ...getColumnSearchProps(
        "formatCreatedAt",
        intl.formatMessage({
          id: "admin.registered",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.last.updated" />,
      dataIndex: "formatUpdatedAt",
      key: "updated",
      sorter: (a, b) => {
        return (
          moment(a.formatUpdatedAt).unix() - moment(b.formatUpdatedAt).unix()
        );
      },
      ...getColumnSearchProps(
        "formatUpdatedAt",
        intl.formatMessage({
          id: "admin.last.updated",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.tenure" />,
      dataIndex: "tenure",
      key: "tenure",
      filters: uniq(data.map((i) => i.tenure)).map((i) => ({
        text: i,
        value: i,
      })),
      onFilter: (value, record) => record.tenure === value,
    },
    {
      title: <FormattedMessage id="admin.roles" />,
      filters: [
        {
          text: <FormattedMessage id="admin.roles.admin" />,
          value: "isAdmin",
        },
        {
          text: <FormattedMessage id="admin.roles.manager" />,
          value: "isManager",
        },
      ],
      onFilter: (value, record) => record[value],
      render: (record) => (
        <>
          <Tag visible={record.isAdmin} color="magenta">
            <FormattedMessage id="admin.roles.admin" />
          </Tag>
          <Tag visible={record.isManager} color="geekblue">
            <FormattedMessage id="admin.roles.manager" />
          </Tag>
          <Tag visible={!record.isManager && !record.isAdmin} color="green">
            <FormattedMessage id="admin.roles.standard" />
          </Tag>
        </>
      ),
    },
    {
      title: <FormattedMessage id="admin.profileStatus" />,
      filters: [
        {
          text: <FormattedMessage id="admin.active" />,
          value: "ACTIVE",
        },
        {
          text: <FormattedMessage id="admin.inactive" />,
          value: "INACTIVE",
        },
        {
          text: <FormattedMessage id="admin.flagged" />,
          value: "HIDDEN",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (record) => {
        return renderStatusDropdown(record.key, record.status);
      },
    },
    {
      title: <FormattedMessage id="admin.delete" />,
      render: (record) => (
        <Popconfirm
          placement="left"
          title={<FormattedMessage id="admin.delete.user" />}
          okText={<FormattedMessage id="admin.delete" />}
          cancelText={<FormattedMessage id="admin.cancel" />}
          onConfirm={() => {
            handleSubmitDelete(record.key)
              .then(popUpSuccesss)
              .catch((error) => handleError(error, "message"));
          }}
          onCancel={() => {
            popUpCancel();
          }}
          overlayStyle={{ maxWidth: 350 }}
        >
          <Button shape="circle" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header
        title={
          <>
            <FormattedMessage id="admin.user.table" />
            {modifiedStatus && (
              <Text style={styles.unsavedText}>
                (<FormattedMessage id="profile.form.unsaved" />)
              </Text>
            )}
          </>
        }
        extra={
          <>
            {applyButton()}
            {keycloakButton()}
            <Popover
              placement="topRight"
              content={
                <div style={styles.popoverStyle}>
                  <FormattedMessage
                    id="admin.roles.tooltip"
                    values={{
                      b: (chunks) => <b>{chunks}</b>,
                      br: () => <br />,
                    }}
                  />
                </div>
              }
            >
              <InfoCircleOutlined style={styles.adminInfo} />
            </Popover>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={userTableColumns()}
            dataSource={data}
            loading={loading && locale !== dataLocale}
          />
        </Col>
      </Row>
    </>
  );
};

UserTableView.propTypes = {
  intl: IntlPropType,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleApply: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  profileStatusValue: PropTypes.func.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  modifiedStatus: PropTypes.bool.isRequired,
};

UserTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(UserTableView);
