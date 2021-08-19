import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  DatabaseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Table,
} from "antd";
import { sortBy } from "lodash";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import Header from "../../header/Header";

/**
 *  SchoolTableView(props)
 *  This component renders the school table for the Admin School Page.
 */
const SchoolTableView = ({
  handleSearch,
  handleReset,
  handleSubmitAdd,
  handleSubmitEdit,
  handleSubmitDelete,
  selectedRowKeys,
  searchedColumn,
  searchText,
  rowSelection,
}) => {
  const history = useHistory();
  const intl = useIntl();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([{}]);
  const [sortedData, setSortedData] = useState([]);

  let searchInput;

  const { data, loading } = useSelector((state) => state.admin.schools);
  const { locale } = useSelector((state) => state.settings);

  useEffect(() => {
    if (data && locale) {
      setSortedData(sortBy(data, locale === "ENGLISH" ? "en" : "fr"));
    }
  }, [locale, data]);

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => {
    const filterDropdown = ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
          style={{ display: "block", marginBottom: 8, width: 188 }}
          value={selectedKeys[0]}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ marginRight: 8, width: 90 }}
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
    );

    filterDropdown.propTypes = {
      clearFilters: PropTypes.func.isRequired,
      confirm: PropTypes.func.isRequired,
      selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
      setSelectedKeys: PropTypes.func.isRequired,
    };

    return {
      filterDropdown,
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (_value, _record) => {
        if (!_record[dataIndex]) {
          return _value === "-" || _value === "";
        }
        return _record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(_value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      },
      render: (text) => {
        if (searchedColumn === dataIndex) {
          return (
            <Highlighter
              autoEscape
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              textToHighlight={text || "-"}
            />
          );
        }

        if (text) {
          return text;
        }

        return "-";
      },
    };
  };

  getColumnSearchProps.propTypes = {};

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    notification.success({
      message: intl.formatMessage({
        id: "successful",
      }),
    });
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "cancelled",
      }),
    });
  };

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => (
    <Popconfirm
      cancelText={<FormattedMessage id="cancel" />}
      disabled={selectedRowKeys.length === 0}
      okText={<FormattedMessage id="delete" />}
      onCancel={() => {
        popUpCancel();
      }}
      onConfirm={() => {
        handleSubmitDelete()
          .then(popUpSuccesss)
          .catch((error) => handleError(error, "message", history));
      }}
      overlayStyle={{ maxWidth: 350 }}
      placement="left"
      title={<FormattedMessage id="delete.school" />}
    >
      <Button danger disabled={selectedRowKeys.length === 0}>
        <DeleteOutlined />
        <span>
          <FormattedMessage id="delete" />
        </span>
      </Button>
    </Popconfirm>
  );

  /* handles closure of add or edit school modal */
  // occurs if "Ok" option is hit
  const handleOk = () => {
    if (modalType === "edit") {
      setEditVisible(false);
      setRecord(null);
    } else if (modalType === "add") {
      setAddVisible(false);
    }
    setModalType("");
    popUpSuccesss();
  };

  /* handles closure of add or edit school modal */
  // occurs if "Cancel" option is hit
  const handleCancel = () => {
    if (modalType === "edit") {
      setEditVisible(false);
    } else if (modalType === "add") {
      setAddVisible(false);
    }
    setModalType("");
    popUpCancel();
  };

  /* handles render of "Edit School" modal */
  const handleEditModal = (_record) => {
    setEditVisible(true);
    setRecord(_record);
    setModalType("edit");
  };

  /* handles render of "Add School" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* Renders "Add School" modal */
  const addSchoolModal = () => (
    <Modal
      cancelText={<FormattedMessage id="cancel" />}
      okText={<FormattedMessage id="save" />}
      onCancel={() => {
        addForm.resetFields();
        handleCancel();
      }}
      onOk={() => {
        addForm
          .validateFields()
          .then(async (values) => {
            await handleSubmitAdd(values);
            addForm.resetFields();
            handleOk();
          })
          .catch((error) => {
            if (error.isAxiosError) {
              handleError(error, "message", history);
            }
          });
      }}
      title={<FormattedMessage id="add.school" />}
      visible={addVisible}
    >
      <Form form={addForm} layout="vertical" name="addSchool">
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="addSchoolEn"
          rules={[
            {
              message: <FormattedMessage id="validate.name" />,
              required: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder={intl.formatMessage({
              id: "add.school.name",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="addSchoolFr"
          rules={[
            {
              message: <FormattedMessage id="validate.name" />,
              required: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder={intl.formatMessage({
              id: "add.school.name",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="province.state.limit" />}
          name="addSchoolProvince"
          rules={[
            {
              message: <FormattedMessage id="validate.location" />,
              required: true,
            },
            {
              max: 2,
              message: <FormattedMessage id="validate.length.2" />,
              min: 2,
            },
          ]}
        >
          <Input
            allowClear
            maxLength={2}
            placeholder={intl.formatMessage({
              id: "add.school.state",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="country.limit" />}
          name="addSchoolCountry"
          rules={[
            {
              message: <FormattedMessage id="validate.country" />,
              required: true,
            },
            {
              max: 3,
              message: <FormattedMessage id="validate.length.3" />,
              min: 3,
            },
          ]}
        >
          <Input
            allowClear
            maxLength={3}
            placeholder={intl.formatMessage({
              id: "add.school.country",
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  /* Renders "Edit School" modal */
  const editSchoolModal = () => (
    <Modal
      cancelText={<FormattedMessage id="cancel" />}
      okText={<FormattedMessage id="save" />}
      onCancel={() => {
        editForm.resetFields();
        handleCancel();
      }}
      onOk={() => {
        editForm
          .validateFields()
          .then(async (values) => {
            await handleSubmitEdit(values, record.id);
            editForm.resetFields();
            handleOk();
          })
          .catch((error) => {
            if (error.isAxiosError) {
              handleError(error, "message", history);
            }
          });
      }}
      title={<FormattedMessage id="edit.school" />}
      visible={editVisible}
    >
      <Form
        fields={fields}
        form={editForm}
        layout="vertical"
        name="editSchool"
        onFieldsChange={() => {
          setFields([{}]);
        }}
      >
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="editSchoolEn"
          rules={[
            {
              message: <FormattedMessage id="validate.name" />,
              required: true,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.school.name",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="editSchoolFr"
          rules={[
            {
              message: <FormattedMessage id="validate.name" />,
              required: true,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.school.name",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="province.state.limit" />}
          name="editSchoolProvince"
          rules={[
            {
              message: <FormattedMessage id="validate.location" />,
              required: true,
            },
            {
              max: 2,
              message: <FormattedMessage id="validate.length.2" />,
              min: 2,
            },
          ]}
        >
          <Input
            maxLength={2}
            placeholder={intl.formatMessage({
              id: "add.school.state",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="country.limit" />}
          name="editSchoolCountry"
          rules={[
            {
              message: <FormattedMessage id="validate.country" />,
              required: true,
            },
            {
              max: 3,
              message: <FormattedMessage id="validate.length.3" />,
              min: 3,
            },
          ]}
        >
          <Input
            maxLength={3}
            placeholder={intl.formatMessage({
              id: "add.school.state",
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  /* Sets up the columns for the school table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const schoolsTableColumns = () => [
    {
      dataIndex: "en",
      key: "en",
      sortDirections: locale === "ENGLISH" ? ["descend"] : undefined,
      sorter: (a, b) => {
        if (!a.en) {
          return 1;
        }
        if (!b.en) {
          return -1;
        }

        return a.en.localeCompare(b.en);
      },
      title: <FormattedMessage id="language.english" />,
      ...getColumnSearchProps(
        "en",
        intl.formatMessage({
          id: "language.english",
        })
      ),
    },
    {
      dataIndex: "fr",
      key: "fr",
      sortDirections: locale === "FRENCH" ? ["descend"] : undefined,
      sorter: (a, b) => {
        if (!a.fr) {
          return 1;
        }
        if (!b.fr) {
          return -1;
        }

        return a.fr.localeCompare(b.fr);
      },
      title: <FormattedMessage id="language.french" />,
      ...getColumnSearchProps(
        "fr",
        intl.formatMessage({
          id: "language.french",
        })
      ),
    },
    {
      dataIndex: "abbrProvince",
      key: "schoolState",
      sorter: (a, b) => a.abbrProvince.localeCompare(b.abbrProvince),
      title: <FormattedMessage id="province.state" />,
      ...getColumnSearchProps(
        "abbrProvince",
        intl.formatMessage({
          id: "province.state",
        })
      ),
    },
    {
      dataIndex: "abbrCountry",
      key: "schoolCountry",
      sorter: (a, b) => a.abbrCountry.localeCompare(b.abbrCountry),
      title: <FormattedMessage id="country" />,
      ...getColumnSearchProps(
        "abbrCountry",
        intl.formatMessage({
          id: "country",
        })
      ),
    },
    {
      fixed: "right",
      key: "edit",
      render: (item) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setFields([
                { name: ["editSchoolEn"], value: item.en },
                { name: ["editSchoolFr"], value: item.fr },
                { name: ["editSchoolProvince"], value: item.abbrProvince },
                { name: ["editSchoolCountry"], value: item.abbrCountry },
              ]);
              handleEditModal(item);
            }}
            shape="circle"
            type="primary"
          />
        </div>
      ),
      title: <FormattedMessage id="edit" />,
      width: 70,
    },
  ];

  return (
    <>
      {addSchoolModal()}
      {editSchoolModal()}
      <Header
        extra={
          <>
            {deleteConfirm()}
            <Button onClick={handleAddModal} type="primary">
              <PlusCircleOutlined />
              <span>
                <FormattedMessage id="add" />
              </span>
            </Button>
          </>
        }
        icon={<DatabaseOutlined />}
        title={<FormattedMessage id="schools" />}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={schoolsTableColumns()}
            dataSource={sortedData}
            loading={loading}
            rowSelection={rowSelection}
            scroll={{ x: 700 }}
          />
        </Col>
      </Row>
    </>
  );
};

SchoolTableView.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  rowSelection: PropTypes.shape({ onChange: PropTypes.func }).isRequired,
  searchText: PropTypes.string.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SchoolTableView;
