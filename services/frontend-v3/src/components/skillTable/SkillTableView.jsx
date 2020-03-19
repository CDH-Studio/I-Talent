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
  Select,
  message
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { injectIntl } from "react-intl";

function SkillTableView(props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [searchInput, setSearchInput] = useState();

  const {
    handleSearch,
    handleReset,
    handleSubmitDelete,
    handleSubmitCancel,
    selectedRowKeys,
    searchedColumn,
    searchText,
    size,
    rowSelection,
    data,
    categories
  } = props;

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node);
          }}
          placeholder={
            props.intl.formatMessage({
              id: "admin.search",
              defaultMessage: "Search for"
            }) +
            " " +
            title
          }
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
          {props.intl.formatMessage({
            id: "admin.search.button",
            defaultMessage: "Search"
          })}
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {props.intl.formatMessage({
            id: "admin.reset.button",
            defaultMessage: "Reset"
          })}
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      try {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      } catch (error) {}
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
      )
  });

  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={props.intl.formatMessage({
          id: "admin.delete.confirmation",
          defaultMessage:
            "Are you sure you want to delete all the selected values?"
        })}
        onConfirm={handleSubmitDelete}
        onCancel={handleSubmitCancel}
        okText={props.intl.formatMessage({
          id: "admin.delete",
          defaultMessage: "Delete"
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
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
            defaultMessage: "Delete"
          })}
        </Button>
      </Popconfirm>
    );
  };

  const onCreate = values => {
    if (modalType === "edit") {
      console.log("(Edit) Received values of form: ", values);
    } else if (modalType === "add") {
      console.log("(Add) Received values of form: ", values);
    }
  };

  const addSkillButton = () => {
    return (
      <Modal
        title={props.intl.formatMessage({
          id: "admin.edit.skill",
          defaultMessage: "Edit Skill"
        })}
        visible={addVisible}
        okText={props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply"
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
        })}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
          handleOk();
        }}
        onCancel={handleCancel()}
      >
        <Form name="addSkill" layout="vertical">
          <Form.Item
            name="addSkillEn"
            label={props.intl.formatMessage({
              id: "language.english",
              defaultMessage: "English"
            })}
            rules={[
              {
                required: true,
                message: "Please fill out!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="addSkillFr"
            label={props.intl.formatMessage({
              id: "language.french",
              defaultMessage: "French"
            })}
            rules={[
              {
                required: true,
                message: "Please fill out!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="addSkillCategory"
            label={props.intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category"
            })}
          >
            <Select
              showSearch
              placeholder={
                props.intl.formatMessage({
                  id: "admin.select",
                  defaultMessage: "Select"
                }) +
                " " +
                props.intl.formatMessage({
                  id: "admin.category",
                  defaultMessage: "Category"
                })
              }
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map(category => {
                return (
                  <Option value={category.id}>
                    {props.intl.formatMessage({ id: "language.code" }) === "en"
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

  const editSkillButton = () => {
    const categoryName =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? record.categoryNameEn
        : record.categoryNameFr;
    return (
      <Modal
        visible={editVisible}
        title={props.intl.formatMessage({
          id: "admin.edit.skill",
          defaultMessage: "Edit Skill"
        })}
        okText={props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply"
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
        })}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
          handleOk();
        }}
        onCancel={handleCancel()}
      >
        <Form
          name="editSkill"
          layout="vertical"
          fields={[
            { name: ["editSkillEn"], value: record.descriptionEn },
            { name: ["editSkillFr"], value: record.descriptionFr },
            {
              name: ["editSkillCategory"],
              value: categoryName
            }
          ]}
        >
          <Form.Item
            name="editSkillEn"
            label={props.intl.formatMessage({
              id: "language.english",
              defaultMessage: "English"
            })}
            rules={[{ required: true, message: "Please fill out!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="editSkillFr"
            label={props.intl.formatMessage({
              id: "language.french",
              defaultMessage: "French"
            })}
            rules={[
              {
                required: true,
                message: "Please fill out!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="editSkillCategory"
            label={props.intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category"
            })}
          >
            <Select
              showSearch
              placeholder={
                props.intl.formatMessage({
                  id: "admin.select",
                  defaultMessage: "Select"
                }) +
                " " +
                props.intl.formatMessage({
                  id: "admin.category",
                  defaultMessage: "Category"
                })
              }
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.map(category => {
                return (
                  <Option value={category.id}>
                    {props.intl.formatMessage({ id: "language.code" }) === "en"
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

  const handleOk = () => {
    if (modalType === "edit") {
      setEditVisible(false);
      setRecord(null);
      setModalType("");
      message.success(
        props.intl.formatMessage({
          id: "admin.success",
          defaultMessage: "Successful"
        })
      );
    } else if (modalType === "add") {
      setAddVisible(false);
      setModalType("");
      message.success(
        props.intl.formatMessage({
          id: "admin.success",
          defaultMessage: "Successful"
        })
      );
    }
  };

  const handleCancel = () => {
    if (modalType === "edit") {
      setEditVisible(false);
      setModalType("");
      message.error(
        props.intl.formatMessage({
          id: "admin.cancelled",
          defaultMessage: "Cancelled"
        })
      );
    } else if (modalType === "add") {
      setAddVisible(false);
      setModalType("");
      message.error(
        props.intl.formatMessage({
          id: "admin.cancelled",
          defaultMessage: "Cancelled"
        })
      );
    }
  };

  const handleEditModal = record => {
    setEditVisible(true);
    console.log(record);
    setRecord(record);
    setModalType("edit");
  };

  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  const skillTableColumns = () => {
    const categoryName =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "categoryNameEn"
        : "categoryNameFr";

    const skill_table_columns = [
      {
        title: props.intl.formatMessage({
          id: "language.english",
          defaultMessage: "English"
        }),
        dataIndex: "descriptionEn",
        key: "skillEn",
        sorter: (a, b) => {
          return a.descriptionEn.localeCompare(b.descriptionEn);
        },
        ...getColumnSearchProps(
          "descriptionEn",
          props.intl.formatMessage({
            id: "language.english",
            defaultMessage: "English"
          })
        )
      },
      {
        title: props.intl.formatMessage({
          id: "language.french",
          defaultMessage: "French"
        }),
        dataIndex: "descriptionFr",
        key: "skillFr",
        sorter: (a, b) => {
          return a.descriptionFr.localeCompare(b.descriptionFr);
        },
        ...getColumnSearchProps(
          "descriptionFr",
          props.intl.formatMessage({
            id: "language.french",
            defaultMessage: "French"
          })
        )
      },
      {
        title: props.intl.formatMessage({
          id: "admin.category",
          defaultMessage: "Category"
        }),
        dataIndex: categoryName,
        key: "category",
        sorter: (a, b) => {
          return a[categoryName].localeCompare(b[categoryName]);
        },
        ...getColumnSearchProps(
          categoryName,
          props.intl.formatMessage({
            id: "admin.category",
            defaultMessage: "Category"
          })
        )
      },
      {
        title: props.intl.formatMessage({
          id: "admin.edit",
          defaultMessage: "Edit"
        }),
        key: "edit",
        render: record => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                handleEditModal(record);
              }}
            />
          </div>
        )
      }
    ];

    return skill_table_columns;
  };

  return (
    <>
      {addSkillButton()}
      {editSkillButton()}
      <PageHeader
        title={props.intl.formatMessage({
          id: "admin.skill.table",
          defaultMessage: "Skills Table"
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
              defaultMessage: "Add"
            })}
          </Button>
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

export default injectIntl(SkillTableView);
