import React from "react";
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
  Select
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { injectIntl } from "react-intl";

const { Option } = Select;

class SkillTableView extends React.Component {
  constructor(props) {
    super(props);
  }

  // Search Function
  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={
            this.props.intl.formatMessage({
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
          onPressEnter={() =>
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.props.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
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
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.props.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.props.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  deleteConfirm = () => {
    const { size, selectedRowKeys } = this.props;
    return (
      <Popconfirm
        placement="left"
        title={this.props.intl.formatMessage({
          id: "admin.delete.confirmation",
          defaultMessage:
            "Are you sure you want to delete all the selected values?"
        })}
        onConfirm={this.props.handleSubmitDelete}
        onCancel={this.props.handleSubmitCancel}
        okText={this.props.intl.formatMessage({
          id: "admin.delete",
          defaultMessage: "Delete"
        })}
        cancelText={this.props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
        })}
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size={size}
          onClick={() => {
            this.props.handleClick("delete");
          }}
          disabled={selectedRowKeys.length === 0}
        >
          {this.props.intl.formatMessage({
            id: "admin.delete",
            defaultMessage: "Delete"
          })}
        </Button>
      </Popconfirm>
    );
  };
  /////////////////////

  addSkillButton = () => {
    const { visible, allCategories } = this.props;
    const [form] = Form.useForm();
    return (
      <Modal
        title={this.props.intl.formatMessage({
          id: "admin.edit.skill",
          defaultMessage: "Edit Skill"
        })}
        visible={visible}
        okText={this.props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply"
        })}
        cancelText={this.props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
        })}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
          this.handleOk();
        }}
        onCancel={this.props.handleCancel}
      >
        <Form name="addSkill" layout="vertical">
          <Form.Item
            name="skillEn"
            label={this.props.intl.formatMessage({
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
            name="skillFr"
            label={this.props.intl.formatMessage({
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
            name="select_category"
            label={this.props.intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category"
            })}
          >
            <Select
              showSearch
              placeholder={
                this.props.intl.formatMessage({
                  id: "admin.select",
                  defaultMessage: "Select"
                }) +
                " " +
                this.props.intl.formatMessage({
                  id: "admin.category",
                  defaultMessage: "Category"
                })
              }
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allCategories.map(category => {
                return (
                  <Option value={category.id}>
                    {this.props.intl.formatMessage({ id: "language.code" }) ===
                    "en"
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

  editSkillButton = () => {
    const { visible, allCategories } = this.props;
    const [form] = Form.useForm();
    const record = this.props.record || {};
    console.log(record);
    const categoryName =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? record.categoryNameEn
        : record.categoryNameFr;
    return (
      <Modal
        title={this.props.intl.formatMessage({
          id: "admin.edit.skill",
          defaultMessage: "Edit Skill"
        })}
        visible={visible}
        okText={this.props.intl.formatMessage({
          id: "admin.apply",
          defaultMessage: "Apply"
        })}
        cancelText={this.props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel"
        })}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
          this.handleOk();
        }}
        onCancel={this.props.handleCancel}
      >
        <Form
          name={record.descriptionEn + "/" + record.descriptionFr}
          layout="vertical"
          fields={[
            { name: [record.descriptionEn], value: record.descriptionEn },
            { name: [record.descriptionFr], value: record.descriptionFr },
            { name: ["select_category"], value: categoryName }
          ]}
        >
          <Form.Item
            name={record.descriptionEn}
            label={this.props.intl.formatMessage({
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
            name={record.descriptionFr}
            label={this.props.intl.formatMessage({
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
            name="select_category"
            label={this.props.intl.formatMessage({
              id: "admin.category",
              defaultMessage: "Category"
            })}
          >
            <Select
              showSearch
              placeholder={
                this.props.intl.formatMessage({
                  id: "admin.select",
                  defaultMessage: "Select"
                }) +
                " " +
                this.props.intl.formatMessage({
                  id: "admin.category",
                  defaultMessage: "Category"
                })
              }
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allCategories.map(category => {
                return (
                  <Option value={category.id}>
                    {this.props.intl.formatMessage({ id: "language.code" }) ===
                    "en"
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

  skillTableColumns() {
    const categoryName =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "categoryNameEn"
        : "categoryNameFr";

    const skill_table_columns = [
      {
        title: this.props.intl.formatMessage({
          id: "language.english",
          defaultMessage: "English"
        }),
        dataIndex: "descriptionEn",
        key: "skillEn",
        sorter: (a, b) => {
          return a.descriptionEn.localeCompare(b.descriptionEn);
        },
        ...this.getColumnSearchProps(
          "descriptionEn",
          this.props.intl.formatMessage({
            id: "language.english",
            defaultMessage: "English"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "language.french",
          defaultMessage: "French"
        }),
        dataIndex: "descriptionFr",
        key: "skillFr",
        sorter: (a, b) => {
          return a.descriptionFr.localeCompare(b.descriptionFr);
        },
        ...this.getColumnSearchProps(
          "descriptionFr",
          this.props.intl.formatMessage({
            id: "language.french",
            defaultMessage: "French"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.category",
          defaultMessage: "Category"
        }),
        dataIndex: categoryName,
        key: "category",
        sorter: (a, b) => {
          return a[categoryName].localeCompare(b[categoryName]);
        },
        ...this.getColumnSearchProps(
          categoryName,
          this.props.intl.formatMessage({
            id: "admin.category",
            defaultMessage: "Category"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
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
              onClick={() => this.props.showEditModal(record)}
            />
            {this.editSkillButton()}
          </div>
        )
      }
    ];

    return skill_table_columns;
  }

  render() {
    const { data, size, rowSelection } = this.props;
    return (
      <>
        <PageHeader
          title="Skills Table"
          extra={[
            this.deleteConfirm(),
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={size}
              onClick={() => {
                this.props.showAddModal();
                this.addSkillButton();
              }}
            >
              {this.props.intl.formatMessage({
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
              columns={this.skillTableColumns()}
              dataSource={data}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default injectIntl(SkillTableView);
