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
 *  SchoolTableView(props)
 *  This component renders the school table for the Admin School Page.
 */
function SchoolTableView(props) {
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

  /* handles the transfer of new or update/edited school information to function */
  // Allows for backend action to occur based on modalType
  const onCreate = (values) => {
    if (modalType === "edit") {
      handleSubmitEdit(values, record.id);
    } else if (modalType === "add") {
      handleSubmitAdd(values);
    }
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
  const handleEditModal = (record) => {
    setEditVisible(true);
    setRecord(record);
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
        title={props.intl.formatMessage({
          id: "admin.add.school",
          defaultMessage: "Add School",
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
        <Form form={addForm} name="addSchool" layout="vertical">
          <Form.Item
            name="addSchoolName"
            label={props.intl.formatMessage({
              id: "admin.name",
              defaultMessage: "Name",
            })}
            rules={[
              {
                required: true,
                message: props.intl.formatMessage({
                  id: "admin.validate.name",
                  defaultMessage: "Please complete the school name!",
                }),
              },
            ]}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.name",
                defaultMessage: "Input the school name",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSchoolState"
            label={props.intl.formatMessage({
              id: "admin.state.limit",
              defaultMessage: "Province/State (2-Letter Abbreviation)",
            })}
            rules={[
              {
                required: true,
                message: props.intl.formatMessage({
                  id: "admin.validate.location",
                  defaultMessage: "Please complete the location information!",
                }),
              },
            ]}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.state",
                defaultMessage: "Input the location information",
              })}
              maxLength={2}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSchoolCountry"
            label={props.intl.formatMessage({
              id: "admin.country.limit",
              defaultMessage: "Country (3-Letter Abbreviation)",
            })}
            rules={[
              {
                required: true,
                message: props.intl.formatMessage({
                  id: "admin.validate.country",
                  defaultMessage: "Please complete the country name!",
                }),
              },
            ]}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.country",
                defaultMessage: "Input the country name",
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
        title={props.intl.formatMessage({
          id: "admin.edit.school",
          defaultMessage: "Edit School",
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
          name="editSchool"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editSchoolName"
            label={props.intl.formatMessage({
              id: "admin.name",
              defaultMessage: "Name",
            })}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.name",
                defaultMessage: "Input the school name",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSchoolState"
            label={props.intl.formatMessage({
              id: "admin.state.limit",
              defaultMessage: "Province/State (2-Letter Abbreviation)",
            })}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.state",
                defaultMessage: "Input the location information",
              })}
              maxLength={2}
            />
          </Form.Item>
          <Form.Item
            name="editSchoolCountry"
            label={props.intl.formatMessage({
              id: "admin.country.limit",
              defaultMessage: "Country (3-Letter Abbreviation)",
            })}
          >
            <Input
              placeholder={props.intl.formatMessage({
                id: "admin.add.school.state",
                defaultMessage: "Input the location information",
              })}
              maxLength={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Sets up the columns for the school table */
  // Consult: Ant Design table components for further clarification
  const schoolsTableColumns = () => {
    // Table columns data structure: array of objects
    const schools_table_columns = [
      {
        title: props.intl.formatMessage({
          id: "admin.name",
          defaultMessage: "Name",
        }),
        dataIndex: "description",
        key: "schoolName",
        sorter: (a, b) => {
          return a.description.localeCompare(b.description);
        },
        sortDirections: ["descend"],
        ...getColumnSearchProps(
          "description",
          props.intl.formatMessage({
            id: "admin.school.singular",
            defaultMessage: "School",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.state",
          defaultMessage: "Province/State",
        }),
        dataIndex: "state",
        key: "schoolState",
        sorter: (a, b) => {
          return a.state.localeCompare(b.state);
        },
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps(
          "state",
          props.intl.formatMessage({
            id: "admin.state",
            defaultMessage: "Province/State",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.country",
          defaultMessage: "Country",
        }),
        dataIndex: "country",
        key: "schoolCountry",
        sorter: (a, b) => {
          return a.country.localeCompare(b.country);
        },
        sortDirections: ["ascend", "descend"],
        ...getColumnSearchProps(
          "country",
          props.intl.formatMessage({
            id: "admin.country",
            defaultMessage: "Country",
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
                  { name: ["editSchoolName"], value: record.description },
                  { name: ["editSchoolState"], value: record.state },
                  { name: ["editSchoolCountry"], value: record.country },
                ]);
                handleEditModal(record);
              }}
            />
          </div>
        ),
      },
    ];
    return schools_table_columns;
  };

  return (
    <>
      {addSchoolModal()}
      {editSchoolModal()}
      <PageHeader
        title={props.intl.formatMessage({
          id: "admin.school.table",
          defaultMessage: "Schools Table",
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
            columns={schoolsTableColumns()}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
}

export default injectIntl(SchoolTableView);
