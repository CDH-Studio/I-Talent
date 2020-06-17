import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Row,
  Col,
  Input,
  Button,
  Table,
  Modal,
  Popconfirm,
  Form,
  message,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import _ from "lodash";

import handleError from "../../../functions/handleError";

/**
 *  DiplomaTableView(props)
 *  This component renders the diploma table for the Admin Diploma Page.
 */
const DiplomaTableView = ({
  handleSearch,
  handleReset,
  handleSubmitAdd,
  handleSubmitEdit,
  handleSubmitDelete,
  selectedRowKeys,
  searchedColumn,
  searchText,
  size,
  rowSelection,
  intl,
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

  const { data, loading } = useSelector((state) => state.admin.diplomas);
  const { locale } = useSelector((state) => state.settings);

  useEffect(() => {
    if (data && locale) {
      setSortedData(_.sortBy(data, locale));
    }
  }, [locale, data]);

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => ({
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
    onFilter: (value, currentRecord) =>
      currentRecord[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    message.success(
      intl.formatMessage({
        id: "admin.success",
      })
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    message.info(
      intl.formatMessage({
        id: "admin.cancelled",
      })
    );
  };

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={<FormattedMessage id="admin.delete.diploma" />}
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
      >
        <Button
          type="primary"
          size={size}
          disabled={selectedRowKeys.length === 0}
        >
          <DeleteOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.delete" />
        </Button>
      </Popconfirm>
    );
  };

  /* handles the transfer of new or update/edited diploma information to function */
  // Allows for backend action to occur based on modalType
  const onCreate = async (values) => {
    if (modalType === "edit") {
      await handleSubmitEdit(values, record.id);
    } else if (modalType === "add") {
      await handleSubmitAdd(values);
    }
  };

  /* handles closure of add or edit diploma modal */
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

  /* handles closure of add or edit diploma modal */
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

  /* handles render of "Edit Diploma" modal */
  const handleEditModal = (item) => {
    setEditVisible(true);
    setRecord(item);
    setModalType("edit");
  };

  /* handles render of "Add Diploma" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* Renders "Add Diploma" modal */
  const addDiplomaModal = () => {
    return (
      <Modal
        visible={addVisible}
        title={<FormattedMessage id="admin.add.diploma" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onOk={() => {
          addForm
            .validateFields()
            .then(async (values) => {
              await onCreate(values);
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
        <Form form={addForm} name="addDiploma" layout="vertical">
          <Form.Item
            name="addDiplomaEn"
            label={<FormattedMessage id="language.english" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.description" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.diploma.descriptionEn",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addDiplomaFr"
            label={<FormattedMessage id="language.french" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="admin.validate.description" />,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.diploma.descriptionFr",
              })}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Renders "Edit Diploma" modal */
  const editDiplomaModal = () => {
    return (
      <Modal
        visible={editVisible}
        title={<FormattedMessage id="admin.edit.diploma" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onOk={() => {
          editForm
            .validateFields()
            .then(async (values) => {
              await onCreate(values);
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
          name="editDiploma"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editDiplomaEn"
            label={<FormattedMessage id="language.english" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.diploma.descriptionEn",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editDiplomaFr"
            label={<FormattedMessage id="language.french" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.diploma.descriptionFr",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Sets up the columns for the diploma table */
  // Consult: Ant Design table components for further clarification
  const diplomaTableColumns = () => {
    // Table columns data structure: array of objects
    const diplomaTableCol = [
      {
        title: <FormattedMessage id="language.english" />,
        dataIndex: "en",
        key: "en",
        sorter: (a, b) => {
          return a.en.localeCompare(b.en);
        },
        sortDirections: locale === "en" ? ["descend"] : undefined,
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
          return a.fr.localeCompare(b.fr);
        },
        sortDirections: locale === "fr" ? ["descend"] : undefined,
        ...getColumnSearchProps(
          "fr",
          intl.formatMessage({
            id: "language.french",
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
                  { name: ["editDiplomaEn"], value: item.en },
                  { name: ["editDiplomaFr"], value: item.fr },
                ]);
                handleEditModal(item);
              }}
            />
          </div>
        ),
      },
    ];
    return diplomaTableCol;
  };

  return (
    <>
      {addDiplomaModal()}
      {editDiplomaModal()}
      <PageHeader
        title={<FormattedMessage id="admin.diploma.table" />}
        extra={
          <>
            {deleteConfirm()}
            <Button type="primary" size={size} onClick={handleAddModal}>
              <PlusCircleOutlined style={{ marginRight: 10 }} />
              <FormattedMessage id="admin.add" />
            </Button>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={diplomaTableColumns()}
            dataSource={sortedData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

DiplomaTableView.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
  rowSelection: PropTypes.shape({
    onChange: PropTypes.func,
  }).isRequired,
  searchText: PropTypes.string.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  size: PropTypes.string.isRequired,
};

export default injectIntl(DiplomaTableView);
