import React, { useState } from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import axios from "axios";
import {
  Typography,
  Skeleton,
  Card,
  Table,
  Input,
  Button,
  Select,
  Popconfirm,
  message,
  Modal,
  Form
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import _ from "lodash";
import { injectIntl } from "react-intl";
import Highlighter from "react-highlight-words";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

const { Option } = Select;

class AdminSkill extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    this.state = {
      type: "skill",
      column: null,
      allData: null,
      data: null,
      direction: null,
      loading: true,
      searchText: "",
      searchedColumn: "",
      size: "large",
      selectedRowKeys: [],
      id: null,
      confirm: null,
      english: null,
      french: null,
      category: null,
      visible: false
    };
  }

  componentDidMount() {
    document.title = this.getDisplayType(true) + " - Admin | MyTalent";
    axios
      .get(backendAddress + "api/admin/options/" + this.state.type)
      .then(res =>
        this.setState({
          allData: res.data,
          data: _.sortBy(res.data, ["descriptionEn"]),
          loading: false,
          column: "english",
          direction: "ascending"
        })
      )
      .catch(function(error) {
        console.error(error);
      });
  }

  getDisplayType = plural => {
    if (plural)
      return this.props.intl.formatMessage({
        id: "admin." + this.state.type + ".plural",
        defaultMessage: this.state.type
      });

    return this.props.intl.formatMessage({
      id: "admin." + this.state.type + ".singular",
      defaultMessage: this.state.type
    });
  };

  // Search Functions
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
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
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
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  ///////////////////////////////////////////////

  handleClick = (type, id, en, fr, categoryId) => {
    this.setState({
      id: id,
      confirm: type,
      english: en,
      french: fr,
      category: categoryId
    });
  };

  handleSubmitDelete = () => {
    const { type, selectedRowKeys } = this.state;
    console.log("Delete Values: ", selectedRowKeys);
    const url = backendAddress + "api/admin/delete/" + type;
    axios.post(url, { ids: selectedRowKeys }).then(() => {
      this.setState({
        deleteValues: [],
        english: null,
        french: null,
        confirm: null,
        category: null
      });

      axios
        .get(backendAddress + "api/admin/options/" + this.state.type)
        .then(res =>
          this.setState({
            allData: res.data,
            data: res.data
          })
        )
        .catch(function(error) {
          console.error(error);
        });

      message.success(
        this.props.intl.formatMessage({
          id: "admin.success",
          defaultMessage: "Successful"
        })
      );
    });
    this.setState(({ selectedRowKeys }) => {
      selectedRowKeys = [];
      return { selectedRowKeys };
    });
  };

  handleSubmitCancel = () => {
    this.setState({ confirm: null, id: null });
    message.error(
      this.props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled"
      })
    );
  };

  deleteConfirm = () => {
    const { size, selectedRowKeys } = this.state;
    return (
      <Popconfirm
        title={this.props.intl.formatMessage({
          id: "admin.delete.confirmation",
          defaultMessage:
            "Are you sure you want to delete all the selected values?"
        })}
        onConfirm={this.handleSubmitDelete}
        onCancel={this.handleSubmitCancel}
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
            this.handleClick("delete");
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

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  showModal = record => {
    this.record = record;
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
    message.success(
      this.props.intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful"
      })
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
    message.error(
      this.props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled"
      })
    );
  };

  editSkillButton = () => {
    const { visible } = this.state;
    const [form] = Form.useForm();
    const record = this.record || {};
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
        onCancel={this.handleCancel}
      >
        <Form
          name={record.descriptionEn + "/" + record.descriptionFr}
          layout="vertical"
          fields={[
            { name: [record.descriptionEn], value: record.descriptionEn },
            { name: [record.descriptionFr], value: record.descriptionFr }
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
        </Form>
      </Modal>
    );
  };

  render() {
    const { data, loading, size, selectedRowKeys } = this.state;

    if (loading) {
      return (
        <AppLayout>
          <Skeleton active />
        </AppLayout>
      );
    }

    let allSkills = data;

    // console.log(allSkills);

    // console.log(allSkills.length);

    for (let i = 0; i < allSkills.length; i++) {
      allSkills[i].key = allSkills[i].id;
    }

    console.log("New: ", allSkills);

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
        dataIndex: "categoryId",
        key: "category",
        sorter: (a, b) => a.categoryId - b.categoryId,
        ...this.getColumnSearchProps(
          "categoryId",
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
              onClick={() => this.showModal(record)}
            />
            {this.editSkillButton()}
          </div>
        )
      }
    ];

    const rowSelection = {
      onChange: selectedRowKeys => {
        this.onSelectChange(selectedRowKeys);
      }
    };

    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <Title>Skills</Title>
        <Card hoverable loading={loading}>
          <div align="right">
            <Button.Group>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size={size}
                //onClick={this.handleApply}
              >
                {this.props.intl.formatMessage({
                  id: "admin.add",
                  defaultMessage: "Add"
                })}
              </Button>
              {this.deleteConfirm()}
            </Button.Group>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={skill_table_columns}
            dataSource={allSkills}
          />
        </Card>
      </AppLayout>
    );
  }
}

export default injectIntl(AdminSkill);
