/* eslint-disable no-shadow */
import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { IntlPropType } from "../../../customPropTypes";
import AdminErrorContent from "../adminErrorContent/AdminErrorContent";

/**
 *  CategoryTableView(props)
 *  This component renders the category table for the Admin Category Page.
 */
const CategoryTableView = ({
  intl,
  handleSearch,
  handleReset,
  handleSubmitAdd,
  handleSubmitEdit,
  handleSubmitDelete,
  networkError,
  selectedRowKeys,
  searchedColumn,
  searchText,
  size,
  rowSelection,
  data,
}) => {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([{}]);

  let searchInput;

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      // eslint-disable-next-line react/prop-types
      setSelectedKeys,
      // eslint-disable-next-line react/prop-types
      selectedKeys,
      // eslint-disable-next-line react/prop-types
      confirm,
      // eslint-disable-next-line react/prop-types
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`${intl.formatMessage({
            id: "admin.search",
            defaultMessage: "Search for",
          })} ${title}`}
          value={selectedKeys[0]}
          onChange={e =>
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
          {intl.formatMessage({
            id: "admin.search.button",
            defaultMessage: "Search",
          })}
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {intl.formatMessage({
            id: "admin.reset.button",
            defaultMessage: "Reset",
          })}
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
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

  /* handles the transfer of new or update/edited category information to function */
  // Allows for backend action to occur based on modalType
  const onCreate = values => {
    if (modalType === "edit") {
      handleSubmitEdit(values, record.id);
    } else if (modalType === "add") {
      handleSubmitAdd(values);
    }
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    message.success(
      intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful",
      })
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    message.error(
      intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled",
      })
    );
  };

  /* checks if deletion of category can occur */
  // Gives error prompt if deletion cannot occur
  // Backend: checks if category does not have any associated skills
  const checkDelete = async () => {
    const result = await handleSubmitDelete();
    if (result === true) {
      Modal.error({
        title: intl.formatMessage({
          id: "admin.category.disclaimer",
          defaultMessage: "Disclaimer",
        }),
        content: intl.formatMessage({
          id: "admin.category.disclaimer.message",
          defaultMessage: "Cannot delete category with skill associations!",
        }),
      });
    } else {
      popUpSuccesss();
    }
  };

  /* handles closure of add or edit category modal */
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

  /* handles closure of add or edit category modal */
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

  /* handles render of "Edit Category" modal */
  const handleEditModal = record => {
    setEditVisible(true);
    setRecord(record);
    setModalType("edit");
  };

  /* handles render of "Add Category" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* gets sort direction for a table column */
  // Use for tables that need a French and English column
  // Will change sort capability of column based on current language of page
  const getSortDirection = column => {
    const currentLanguage =
      intl.formatMessage({ id: "language.code" }) === "en" ? "en" : "fr";
    if (column === currentLanguage) {
      return ["descend"];
    }
    return ["ascend", "descend"];
  };

  /* Renders "Add Category" modal */
  const addCategoryButton = () => {
    return (
      <Modal
        visible={addVisible}
        title={intl.formatMessage({
          id: "admin.add.category",
          defaultMessage: "Add Category",
        })}
        okText={intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply",
        })}
        cancelText={intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
        onOk={() => {
          addForm
            .validateFields()
            .then(values => {
              addForm.resetFields();
              onCreate(values);
              handleOk();
            })
            .catch(info => {
              handleCancel();
              // eslint-disable-next-line no-console
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => {
          addForm.resetFields();
          handleCancel();
        }}
      >
        <Form form={addForm} name="addCategory" layout="vertical">
          <Form.Item
            name="addCategoryEn"
            label={intl.formatMessage({
              id: "language.english",
              defaultMessage: "English",
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "admin.validate.description",
                  defaultMessage: "Please complete the description!",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.category.descriptionEn",
                defaultMessage: "Category description in English",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addCategoryFr"
            label={intl.formatMessage({
              id: "language.french",
              defaultMessage: "French",
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "admin.validate.description",
                  defaultMessage: "Please complete the description!",
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.category.descriptionFr",
                defaultMessage: "Category description in French",
              })}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Renders "Edit Category" modal */
  const editCategoryButton = () => {
    return (
      <Modal
        visible={editVisible}
        title={intl.formatMessage({
          id: "admin.edit.category",
          defaultMessage: "Edit Category",
        })}
        okText={intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply",
        })}
        cancelText={intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
        onOk={() => {
          editForm
            .validateFields()
            .then(values => {
              editForm.resetFields();
              onCreate(values);
            })
            .catch(info => {
              // eslint-disable-next-line no-console
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
          name="editCategory"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editCategoryEn"
            label={intl.formatMessage({
              id: "language.english",
              defaultMessage: "English",
            })}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.category.descriptionEn",
                defaultMessage: "Category description in English",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editCategoryFr"
            label={intl.formatMessage({
              id: "language.french",
              defaultMessage: "French",
            })}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.category.descriptionFr",
                defaultMessage: "Category description in French",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={intl.formatMessage({
          id: "admin.delete.confirm",
          defaultMessage:
            "Are you sure you want to delete all the selected values?",
        })}
        onConfirm={() => {
          checkDelete();
        }}
        onCancel={() => {
          popUpCancel();
        }}
        okText={intl.formatMessage({
          id: "admin.delete",
          defaultMessage: "Delete",
        })}
        cancelText={intl.formatMessage({
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
          {intl.formatMessage({
            id: "admin.delete",
            defaultMessage: "Delete",
          })}
        </Button>
      </Popconfirm>
    );
  };

  /* Sets up the columns for the category table */
  // Consult: Ant Design table components for further clarification
  const categoryTableColumns = () => {
    // Table columns data structure: array of objects
    const categoryTableColumns = [
      {
        title: intl.formatMessage({
          id: "language.english",
          defaultMessage: "English",
        }),
        dataIndex: "descriptionEn",
        key: "categoryEn",
        sorter: (a, b) => {
          return a.descriptionEn.localeCompare(b.descriptionEn);
        },
        sortDirections: getSortDirection("en"),
        ...getColumnSearchProps(
          "descriptionEn",
          intl.formatMessage({
            id: "language.english",
            defaultMessage: "English",
          })
        ),
      },
      {
        title: intl.formatMessage({
          id: "language.french",
          defaultMessage: "French",
        }),
        dataIndex: "descriptionFr",
        key: "categoryFr",
        sorter: (a, b) => {
          return a.descriptionFr.localeCompare(b.descriptionFr);
        },
        sortDirections: getSortDirection("fr"),
        ...getColumnSearchProps(
          "descriptionFr",
          intl.formatMessage({
            id: "language.french",
            defaultMessage: "French",
          })
        ),
      },
      {
        title: intl.formatMessage({
          id: "admin.edit",
          defaultMessage: "Edit",
        }),
        key: "edit",
        render: record => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setFields([
                  { name: ["editCategoryEn"], value: record.descriptionEn },
                  { name: ["editCategoryFr"], value: record.descriptionFr },
                ]);
                handleEditModal(record);
              }}
            />
          </div>
        ),
      },
    ];
    return categoryTableColumns;
  };

  if (networkError) {
    return <AdminErrorContent networkError={networkError} />;
  }

  return (
    <>
      {addCategoryButton()}
      {editCategoryButton()}
      <PageHeader
        title={intl.formatMessage({
          id: "admin.category.table",
          defaultMessage: "Categories Table",
        })}
        extra={
          <>
            {deleteConfirm()}
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={size}
              onClick={() => {
                handleAddModal();
              }}
            >
              {intl.formatMessage({
                id: "admin.add",
                defaultMessage: "Add",
              })}
            </Button>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={categoryTableColumns()}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
};

CategoryTableView.propTypes = {
  intl: IntlPropType,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  rowSelection: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  // data: PropTypes.shape({
  //   getCategoryInformation: PropTypes.shape({
  //     description: PropTypes.string,
  //     allCategories: PropTypes.any,
  //   }),
  // }).isRequired,
};

CategoryTableView.defaultProps = {
  intl: undefined,
  rowSelection: undefined,
};

export default injectIntl(CategoryTableView);
