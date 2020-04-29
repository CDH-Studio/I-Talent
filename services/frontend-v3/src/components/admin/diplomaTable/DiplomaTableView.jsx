import React, { useState } from "react";
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
import { injectIntl } from "react-intl";

/**
 *  DiplomaTableView(props)
 *  This component renders the diploma table for the Admin Diploma Page.
 */
function DiplomaTableView(props) {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([{}]);

  let searchInput;

  const {
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
    data,
  } = props;

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
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
          placeholder={
            props.intl.formatMessage({
              id: "admin.search",
              defaultMessage: "Search for",
            }) +
            " " +
            title
          }
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
          {props.intl.formatMessage({
            id: "admin.search.button",
            defaultMessage: "Search",
          })}
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {props.intl.formatMessage({
            id: "admin.reset.button",
            defaultMessage: "Reset",
          })}
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

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={props.intl.formatMessage({
          id: "admin.delete.confirm",
          defaultMessage:
            "Are you sure you want to delete all the selected values?",
        })}
        onConfirm={() => {
          handleSubmitDelete();
          popUpSuccesss();
        }}
        onCancel={() => {
          popUpCancel();
        }}
        okText={props.intl.formatMessage({
          id: "admin.delete",
          defaultMessage: "Delete",
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size={size}
          disabled={selectedRowKeys.length === 0}
        >
          {props.intl.formatMessage({
            id: "admin.delete",
            defaultMessage: "Delete",
          })}
        </Button>
      </Popconfirm>
    );
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    message.success(
      props.intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful",
      })
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    message.error(
      props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled",
      })
    );
  };

  /* handles the transfer of new or update/edited diploma information to function */
  // Allows for backend action to occur based on modalType
  const onCreate = (values) => {
    if (modalType === "edit") {
      handleSubmitEdit(values, record.id);
    } else if (modalType === "add") {
      handleSubmitAdd(values);
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
  const handleEditModal = (record) => {
    setEditVisible(true);
    setRecord(record);
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
        title={props.intl.formatMessage({
          id: "admin.add.diploma",
          defaultMessage: "Add Diploma",
        })}
        okText={props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply",
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
        onOk={() => {
          addForm
            .validateFields()
            .then((values) => {
              addForm.resetFields();
              onCreate(values);
              handleOk();
            })
            .catch((info) => {
              handleCancel();
              console.log("Validate Failed:", info);
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
            label={props.intl.formatMessage({
              id: "language.english",
              defaultMessage: "English",
            })}
            rules={[
              {
                required: true,
                message: props.intl.formatMessage({
                  id: "admin.validate.description",
                  defaultMessage: "Please complete the description!",
                }),
              },
            ]}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.diploma.descriptionEn",
                defaultMessage: "Diploma description in English",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addDiplomaFr"
            label={props.intl.formatMessage({
              id: "language.french",
              defaultMessage: "French",
            })}
            rules={[
              {
                required: true,
                message: props.intl.formatMessage({
                  id: "admin.validate.description",
                  defaultMessage: "Please complete the description!",
                }),
              },
            ]}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.diploma.descriptionFr",
                defaultMessage: "Diploma description in French",
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
        title={props.intl.formatMessage({
          id: "admin.edit.diploma",
          defaultMessage: "Edit Diploma",
        })}
        okText={props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply",
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              editForm.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
          handleOk();
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
            label={props.intl.formatMessage({
              id: "language.english",
              defaultMessage: "English",
            })}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.diploma.descriptionEn",
                defaultMessage: "Diploma description in English",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editDiplomaFr"
            label={props.intl.formatMessage({
              id: "language.french",
              defaultMessage: "French",
            })}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.diploma.descriptionFr",
                defaultMessage: "Diploma description in French",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* gets sort direction for a table column */
  // Use for tables that need a French and English column
  // Will change sort capability of column based on current language of page
  const getSortDirection = (column) => {
    const currentLanguage =
      props.intl.formatMessage({ id: "language.code" }) === "en" ? "en" : "fr";
    if (column === currentLanguage) {
      return ["descend"];
    } else {
      return ["ascend", "descend"];
    }
  };

  /* Sets up the columns for the diploma table */
  // Consult: Ant Design table components for further clarification
  const diplomaTableColumns = () => {
    // Table columns data structure: array of objects
    const diploma_table_columns = [
      {
        title: props.intl.formatMessage({
          id: "language.english",
          defaultMessage: "English",
        }),
        dataIndex: "descriptionEn",
        key: "diplomaEn",
        sorter: (a, b) => {
          return a.descriptionEn.localeCompare(b.descriptionEn);
        },
        sortDirections: getSortDirection("en"),
        ...getColumnSearchProps(
          "descriptionEn",
          props.intl.formatMessage({
            id: "language.english",
            defaultMessage: "English",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "language.french",
          defaultMessage: "French",
        }),
        dataIndex: "descriptionFr",
        key: "diplomaFr",
        sorter: (a, b) => {
          return a.descriptionFr.localeCompare(b.descriptionFr);
        },
        sortDirections: getSortDirection("fr"),
        ...getColumnSearchProps(
          "descriptionFr",
          props.intl.formatMessage({
            id: "language.french",
            defaultMessage: "French",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.edit",
          defaultMessage: "Edit",
        }),
        key: "edit",
        render: (record) => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setFields([
                  { name: ["editDiplomaEn"], value: record.descriptionEn },
                  { name: ["editDiplomaFr"], value: record.descriptionFr },
                ]);
                handleEditModal(record);
              }}
            />
          </div>
        ),
      },
    ];
    return diploma_table_columns;
  };

  return (
    <>
      {addDiplomaModal()}
      {editDiplomaModal()}
      <PageHeader
        title={props.intl.formatMessage({
          id: "admin.diploma.table",
          defaultMessage: "Diplomas Table",
        })}
        extra={[
          deleteConfirm(),
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size={size}
            onClick={() => {
              handleAddModal();
            }}
          >
            {props.intl.formatMessage({
              id: "admin.add",
              defaultMessage: "Add",
            })}
          </Button>,
        ]}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={diplomaTableColumns()}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
}

export default injectIntl(DiplomaTableView);
