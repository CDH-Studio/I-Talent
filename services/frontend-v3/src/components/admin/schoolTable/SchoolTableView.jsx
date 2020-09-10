import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Modal,
  Popconfirm,
  Form,
  notification,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";

import { IntlPropType } from "../../../utils/customPropTypes";
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
  intl,
  selectedRowKeys,
  searchedColumn,
  searchText,
  rowSelection,
}) => {
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

  /*
clearFilters: ƒ onReset()
confirm: ƒ onConfirm()
selectedKeys: ["uni"]
setSelectedKeys: ƒ setSelectedKeys(selectedKeys)
*/
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
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
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
        id: "admin.success",
      }),
    });
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "admin.cancelled",
      }),
    });
  };

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={<FormattedMessage id="admin.delete.school" />}
        okText={<FormattedMessage id="admin.delete" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onConfirm={() => {
          handleSubmitDelete()
            .then(popUpSuccesss)
            .catch((error) => handleError(error, "message"));
        }}
        onCancel={() => {
          popUpCancel();
        }}
        disabled={selectedRowKeys.length === 0}
        overlayStyle={{ maxWidth: 350 }}
      >
        <Button disabled={selectedRowKeys.length === 0} danger>
          <DeleteOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.delete" />
        </Button>
      </Popconfirm>
    );
  };

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
  const addSchoolModal = () => {
    return (
      <Modal
        visible={addVisible}
        title={<FormattedMessage id="admin.add.school" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
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
                handleError(error, "message");
              }
            });
        }}
        onCancel={() => {
          addForm.resetFields();
          handleCancel();
        }}
      >
        <Form form={addForm} name="addSchool" layout="vertical">
          <Form.Item
            name="addSchoolEn"
            label={<FormattedMessage id="language.english" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.name" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.name",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSchoolFr"
            label={<FormattedMessage id="language.french" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.name" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.name",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSchoolProvince"
            label={<FormattedMessage id="admin.state.limit" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.location" />,
              },
              {
                min: 2,
                max: 2,
                message: <FormattedMessage id="admin.validate.length.2" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.state",
              })}
              maxLength={2}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSchoolCountry"
            label={<FormattedMessage id="admin.country.limit" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.country" />,
              },
              {
                min: 3,
                max: 3,
                message: <FormattedMessage id="admin.validate.length.3" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.country",
              })}
              maxLength={3}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Renders "Edit School" modal */
  const editSchoolModal = () => {
    return (
      <Modal
        visible={editVisible}
        title={<FormattedMessage id="admin.edit.school" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
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
                handleError(error, "message");
              }
            });
        }}
        onCancel={() => {
          editForm.resetFields();
          handleCancel();
        }}
      >
        <Form
          form={editForm}
          name="editSchool"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editSchoolEn"
            label={<FormattedMessage id="language.english" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.name",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSchoolFr"
            label={<FormattedMessage id="language.french" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.name",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSchoolProvince"
            label={<FormattedMessage id="admin.state.limit" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.state",
              })}
              maxLength={2}
            />
          </Form.Item>
          <Form.Item
            name="editSchoolCountry"
            label={<FormattedMessage id="admin.country.limit" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.school.state",
              })}
              maxLength={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Sets up the columns for the school table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const schoolsTableColumns = () => [
    {
      title: <FormattedMessage id="language.english" />,
      dataIndex: "en",
      key: "en",
      sorter: (a, b) => {
        if (!a.en) {
          return 1;
        }
        if (!b.en) {
          return -1;
        }

        return a.en.localeCompare(b.en);
      },
      sortDirections: locale === "ENGLISH" ? ["descend"] : undefined,
      ...getColumnSearchProps(
        "en",
        intl.formatMessage({
          id: "language.english",
        })
      ),
    },
    {
      title: <FormattedMessage id="language.french" />,
      dataIndex: "fr",
      key: "fr",
      sorter: (a, b) => {
        if (!a.fr) {
          return 1;
        }
        if (!b.fr) {
          return -1;
        }

        return a.fr.localeCompare(b.fr);
      },
      sortDirections: locale === "FRENCH" ? ["descend"] : undefined,
      ...getColumnSearchProps(
        "fr",
        intl.formatMessage({
          id: "language.french",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.state" />,
      dataIndex: "abbrProvince",
      key: "schoolState",
      sorter: (a, b) => {
        return a.abbrProvince.localeCompare(b.abbrProvince);
      },
      ...getColumnSearchProps(
        "abbrProvince",
        intl.formatMessage({
          id: "admin.state",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.country" />,
      dataIndex: "abbrCountry",
      key: "schoolCountry",
      sorter: (a, b) => {
        return a.abbrCountry.localeCompare(b.abbrCountry);
      },
      ...getColumnSearchProps(
        "abbrCountry",
        intl.formatMessage({
          id: "admin.country",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.edit" />,
      key: "edit",
      render: (item) => (
        <div>
          <Button
            type="primary"
            shape="circle"
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
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {addSchoolModal()}
      {editSchoolModal()}
      <Header
        title={<FormattedMessage id="admin.school.table" />}
        extra={
          <>
            {deleteConfirm()}
            <Button type="primary" onClick={handleAddModal}>
              <PlusCircleOutlined style={{ marginRight: 10 }} />
              <FormattedMessage id="admin.add" />
            </Button>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            showSorterTooltip={false}
            rowSelection={rowSelection}
            columns={schoolsTableColumns()}
            dataSource={sortedData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

SchoolTableView.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  intl: IntlPropType,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  rowSelection: PropTypes.shape({ onChange: PropTypes.func }).isRequired,
};

SchoolTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(SchoolTableView);
