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
  Select,
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
 *  SkillTableView(props)
 *  This component renders the skill table for the Admin Skill Page.
 */
function SkillTableView({
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
  categories,
  intl,
}) {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([{}]);

  let searchInput;

  const { Option } = Select;

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
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`${intl.formatMessage({
            id: "admin.search",
            defaultMessage: "Search for",
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

  /* handles the transfer of new or update/edited skill information to function */
  // Allows for backend action to occur based on modalType
  const onCreate = (values) => {
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

  /* handles closure of add or edit skill modal */
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

  /* handles closure of add or edit skill modal */
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

  /* handles render of "Edit Skill" modal */
  const handleEditModal = (record) => {
    setEditVisible(true);
    setRecord(record);
    setModalType("edit");
  };

  /* handles render of "Add Skill" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
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
          handleSubmitDelete();
          popUpSuccesss();
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

  /* Renders "Edit Skill" modal */
  const editSkillButton = () => {
    return (
      <Modal
        visible={editVisible}
        title={intl.formatMessage({
          id: "admin.edit.skill",
          defaultMessage: "Edit Skill",
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
            .then((values) => {
              editForm.resetFields();
              onCreate(values);
            })
            .catch((info) => {
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
          name="editSkill"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editSkillEn"
            label={intl.formatMessage({
              id: "language.english",
              defaultMessage: "English",
            })}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.skill.descriptionEn",
                defaultMessage: "Skill description in English",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSkillFr"
            label={intl.formatMessage({
              id: "language.french",
              defaultMessage: "French",
            })}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.skill.descriptionFr",
                defaultMessage: "Skill description in French",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSkillCategory"
            label={intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category",
            })}
          >
            <Select
              showSearch
              placeholder={`${intl.formatMessage({
                id: "admin.select",
                defaultMessage: "Select",
              })} ${intl.formatMessage({
                id: "admin.category",
                defaultMessage: "Category",
              })}`}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map((category) => {
                return (
                  <Option value={category.id}>
                    {intl.formatMessage({ id: "language.code" }) === "en"
                      ? category.descriptionEn
                      : category.descriptionFr}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Sets up the columns for the skill table */
  // Consult: Ant Design table components for further clarification
  const skillTableColumns = () => {
    // Allows for switch between French/English in category column:
    const categoryName =
      intl.formatMessage({ id: "language.code" }) === "en"
        ? "categoryNameEn"
        : "categoryNameFr";

    // Table columns data structure: array of objects
    const skill_table_columns = [
      {
        title: intl.formatMessage({
          id: "admin.category",
          defaultMessage: "Category",
        }),
        dataIndex: categoryName,
        key: "category",
        sorter: (a, b) => {
          return a[categoryName].localeCompare(b[categoryName]);
        },
        sortDirections: ["descend"],
        ...getColumnSearchProps(
          categoryName,
          intl.formatMessage({
            id: "admin.category",
            defaultMessage: "Category",
          })
        ),
      },
      {
        title: intl.formatMessage({
          id: "language.english",
          defaultMessage: "English",
        }),
        dataIndex: "descriptionEn",
        key: "skillEn",
        sorter: (a, b) => {
          return a.descriptionEn.localeCompare(b.descriptionEn);
        },
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
        key: "skillFr",
        sorter: (a, b) => {
          return a.descriptionFr.localeCompare(b.descriptionFr);
        },
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
        render: (record) => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                const categoryName =
                  intl.formatMessage({ id: "language.code" }) === "en"
                    ? record.categoryNameEn
                    : record.categoryNameFr;
                setFields([
                  { name: ["editSkillEn"], value: record.descriptionEn },
                  { name: ["editSkillFr"], value: record.descriptionFr },
                  {
                    name: ["editSkillCategory"],
                    value: categoryName,
                  },
                ]);
                handleEditModal(record);
              }}
            />
          </div>
        ),
      },
    ];

    return skill_table_columns;
  };

  /* Renders "Add Skill" modal */
  const addSkillButton = () => {
    return (
      <Modal
        visible={addVisible}
        title={intl.formatMessage({
          id: "admin.add.skill",
          defaultMessage: "Add Skill",
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
        <Form form={addForm} name="addSkill" layout="vertical">
          <Form.Item
            name="addSkillEn"
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
                id: "admin.add.skill.descriptionEn",
                defaultMessage: "Skill description in English",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSkillFr"
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
                id: "admin.add.skill.descriptionFr",
                defaultMessage: "Skill description in French",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSkillCategory"
            label={intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category",
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
            <Select
              showSearch
              placeholder={`${intl.formatMessage({
                id: "admin.select",
                defaultMessage: "Select",
              })} ${intl.formatMessage({
                id: "admin.category",
                defaultMessage: "Category",
              })}`}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map((category) => {
                return (
                  <Option value={category.id}>
                    {intl.formatMessage({ id: "language.code" }) === "en"
                      ? category.descriptionEn
                      : category.descriptionFr}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      {addSkillButton()}
      {editSkillButton()}
      <PageHeader
        title={intl.formatMessage({
          id: "admin.skill.table",
          defaultMessage: "Skills Table",
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
            {intl.formatMessage({
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
            columns={skillTableColumns()}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
}

SkillTableView.propTypes = {
  intl: PropTypes.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  rowSelection: PropTypes.isRequired,
  data: PropTypes.shape({
    getCategoryInformation: PropTypes.shape({
      description: PropTypes.string,
      allCategories: PropTypes.any,
    }),
  }).isRequired,
  categories: PropTypes.isRequired,
};

export default injectIntl(SkillTableView);
