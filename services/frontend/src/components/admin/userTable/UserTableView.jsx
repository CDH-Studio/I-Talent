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
  DatabaseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import { useIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { uniq } from "lodash";

import handleError from "../../../functions/handleError";
import Header from "../../header/Header";
import config from "../../../utils/runtimeConfig";
import "./UserTableView.less";

const { Text } = Typography;

/**
 *  UserTableView(props)
 *  This component renders the user table for the Admin User Page.
 */
const UserTableView = ({
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

  const history = useHistory();
  const intl = useIntl();
  const { Option } = Select;

  const { locale } = useSelector((state) => state.settings);
  const {
    data,
    loading,
    locale: dataLocale,
  } = useSelector((state) => state.admin.users);

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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          placeholder={`${intl.formatMessage({
            id: "search.for",
          })} ${title}`}
          style={{ width: 188, marginBottom: 8, display: "block" }}
          value={selectedKeys[0]}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
          type="primary"
        >
          <FormattedMessage id="search" />
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          <FormattedMessage id="reset" />
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
            autoEscape
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
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
  const renderStatusDropdown = (id, status) => (
    <div>
      <Select
        defaultValue={profileStatusValue(status)}
        onChange={(value) => {
          const user = data.find(({ key }) => key === id);
          const valueToBeSaved = value === user.status ? undefined : value;
          handleDropdownChange(valueToBeSaved, id);
        }}
        style={{ width: 120 }}
      >
        <Option key="active" value="ACTIVE">
          <FormattedMessage id="active" />
        </Option>
        <Option key="inactive" value="INACTIVE">
          <FormattedMessage id="inactive" />
        </Option>
      </Select>
    </div>
  );

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "cancelled",
      }),
    });
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    notification.success({
      message: intl.formatMessage({
        id: "successful",
      }),
    });
  };

  /* Renders the apply button and confirmation prompt */
  const applyButton = () => (
    <Popconfirm
      cancelText={<FormattedMessage id="cancel" />}
      disabled={!modifiedStatus}
      okText={<FormattedMessage id="update" />}
      onCancel={() => {
        popUpCancel();
      }}
      onConfirm={() => {
        handleApply()
          .then(popUpSuccesss)
          .catch((error) => handleError(error, "message", history));
      }}
      placement="left"
      title={<FormattedMessage id="update.confirm" />}
    >
      <Button disabled={!modifiedStatus} type="primary">
        <CheckCircleOutlined />
        <span>
          <FormattedMessage id="save" />
        </span>
      </Button>
    </Popconfirm>
  );

  /* Renders the keycloak button */
  const keycloakButton = () => (
    <Button href={config.manageKeycloakAddress} style={{ marginLeft: 10 }}>
      <TeamOutlined />
      <span>
        <FormattedMessage id="manage.keycloak.roles" />
      </span>
    </Button>
  );

  /* Sets up the columns for the user table */
  // Table columns data structure: array of objects

  // Consult: Ant Design table components for further clarification
  const userTableColumns = () => [
    {
      title: <FormattedMessage id="name" />,
      dataIndex: "fullName",
      key: "name",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortDirections: ["descend"],
      ...getColumnSearchProps(
        "fullName",
        intl.formatMessage({
          id: "name",
        }),
        "profileLink"
      ),
    },
    {
      title: <FormattedMessage id="job.title" />,
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
      ...getColumnSearchProps(
        "jobTitle",
        intl.formatMessage({
          id: "job.title",
        })
      ),
    },
    {
      title: <FormattedMessage id="registered" />,
      dataIndex: "formatCreatedAt",
      key: "registered",
      sorter: (a, b) =>
        dayjs(a.formatCreatedAt).unix() - dayjs(b.formatCreatedAt).unix(),
      ...getColumnSearchProps(
        "formatCreatedAt",
        intl.formatMessage({
          id: "registered",
        })
      ),
    },
    {
      title: <FormattedMessage id="last.updated" />,
      dataIndex: "formatUpdatedAt",
      key: "updated",
      sorter: (a, b) =>
        dayjs(a.formatUpdatedAt).unix() - dayjs(b.formatUpdatedAt).unix(),
      ...getColumnSearchProps(
        "formatUpdatedAt",
        intl.formatMessage({
          id: "last.updated",
        })
      ),
    },
    {
      title: <FormattedMessage id="tenure" />,
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
          text: <FormattedMessage id="admin" />,
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
          <Tag color="magenta" visible={record.isAdmin}>
            <FormattedMessage id="admin" />
          </Tag>
          <Tag color="geekblue" visible={record.isManager}>
            <FormattedMessage id="admin.roles.manager" />
          </Tag>
          <Tag color="green" visible={!record.isManager && !record.isAdmin}>
            <FormattedMessage id="admin.roles.standard" />
          </Tag>
        </>
      ),
    },
    {
      title: <FormattedMessage id="profile.status" />,
      fixed: "right",
      width: 150,
      filters: [
        {
          text: <FormattedMessage id="active" />,
          value: "ACTIVE",
        },
        {
          text: <FormattedMessage id="inactive" />,
          value: "INACTIVE",
        },
      ],
      onFilter: (value, record) =>
        value === "ACTIVE"
          ? record.status === value || record.status === "HIDDEN"
          : record.status === value,
      render: (record) =>
        renderStatusDropdown(
          record.key,
          record.status === "HIDDEN" ? "ACTIVE" : record.status
        ),
    },
    {
      title: <FormattedMessage id="profile.visibility" />,
      fixed: "right",
      width: 150,
      filters: [
        {
          text: <FormattedMessage id="visible" />,
          value: "VISIBLE",
        },
        {
          text: <FormattedMessage id="flagged" />,
          value: "HIDDEN",
        },
      ],
      onFilter: (value, record) =>
        value === "VISIBLE"
          ? record.status === "ACTIVE"
          : record.status === "HIDDEN" || record.status === "INACTIVE",
      render: (record) =>
        record.status === "HIDDEN" || record.status === "INACTIVE" ? (
          <div className="visibility-icon">
            <EyeInvisibleOutlined />
          </div>
        ) : (
          <div className="visibility-icon">
            <EyeOutlined />
          </div>
        ),
    },

    {
      title: <FormattedMessage id="delete" />,
      fixed: "right",
      width: 80,
      render: (record) => (
        <Popconfirm
          cancelText={<FormattedMessage id="cancel" />}
          okText={<FormattedMessage id="delete" />}
          onCancel={() => {
            popUpCancel();
          }}
          onConfirm={() => {
            handleSubmitDelete(record.key)
              .then(popUpSuccesss)
              .catch((error) => handleError(error, "message", history));
          }}
          overlayStyle={{ maxWidth: 350 }}
          placement="left"
          title={<FormattedMessage id="delete.user" />}
        >
          <Button danger icon={<DeleteOutlined />} shape="circle" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header
        extra={
          <Row align="middle">
            {applyButton()}
            {keycloakButton()}
            <Popover
              content={
                <div className="popoverStyle">
                  <FormattedMessage
                    id="admin.roles.tooltip"
                    values={{
                      b: (chunks) => <strong>{chunks}</strong>,
                      br: () => <br />,
                    }}
                  />
                </div>
              }
              placement="topRight"
              trigger={["focus", "hover"]}
            >
              <div className="adminInfo">
                <InfoCircleOutlined tabIndex={0} />
              </div>
            </Popover>
          </Row>
        }
        icon={<DatabaseOutlined />}
        title={
          <>
            <FormattedMessage id="users.table" />
            {modifiedStatus && (
              <Text className="userTable-unsavedText">
                <FormattedMessage id="form.unsaved" />
              </Text>
            )}
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={userTableColumns()}
            dataSource={data}
            loading={loading && locale !== dataLocale}
            pagination={{
              hideOnSinglePage: true,
            }}
            scroll={{ x: 900 }}
          />
        </Col>
      </Row>
    </>
  );
};

UserTableView.propTypes = {
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

export default UserTableView;
