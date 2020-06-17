/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
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
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IntlPropType } from "../../../customPropTypes";
import handleError from "../../../functions/handleError";

/**
 *  SkillTableView(props)
 *  This component renders the skill table for the Admin Skill Page.
 */
const SkillTableView = ({
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
  const [data, setData] = useState([]);

  let searchInput;

  const { Option } = Select;

  const { skills, categories } = useSelector((state) => state.admin);
  const { locale } = useSelector((state) => state.settings);

  useEffect(() => {
    if (skills.data && categories.data.length > 0) {
      setData(
        skills.data.map((skill) => {
          const category = categories.data.find(
            (category) => category.id === skill.categoryId
          );
          return {
            key: skill.id,
            id: skill.id,
            en: skill.en,
            fr: skill.fr,
            category: category ? category[locale] : undefined,
            categoryId: skill.categoryId,
          };
        })
      );
    }
  }, [skills, categories, locale]);

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
  const onCreate = async (values) => {
    if (modalType === "edit") {
      await handleSubmitEdit(values, record.id);
    } else if (modalType === "add") {
      await handleSubmitAdd(values);
    }
  };

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
        title={<FormattedMessage id="admin.delete.skill" />}
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

  /* Renders "Edit Skill" modal */
  const editSkillButton = () => {
    return (
      <Modal
        visible={editVisible}
        title={<FormattedMessage id="admin.edit.skill" />}
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
          name="editSkill"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editSkillEn"
            label={<FormattedMessage id="language.english" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.skill.descriptionEn",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSkillFr"
            label={<FormattedMessage id="language.french" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.skill.descriptionFr",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editSkillCategoryId"
            label={<FormattedMessage id="admin.category" />}
          >
            <Select
              showSearch
              placeholder={`${intl.formatMessage({
                id: "admin.select",
              })} ${intl.formatMessage({
                id: "admin.category",
              })}`}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.data.map((category) => {
                return (
                  <Option value={category.id} key={category.id}>
                    {category[locale]}
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
    // Table columns data structure: array of objects
    const skillTableColumns = [
      {
        title: <FormattedMessage id="admin.category" />,
        dataIndex: "category",
        key: "category",
        sorter: (a, b) => {
          return a.category.localeCompare(b.category);
        },
        ...getColumnSearchProps(
          "category",
          intl.formatMessage({
            id: "admin.category",
          })
        ),
      },
      {
        title: <FormattedMessage id="language.english" />,
        dataIndex: "en",
        key: "en",
        sorter: (a, b) => {
          return a.en.localeCompare(b.en);
        },
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
        render: (record) => (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setFields([
                  { name: ["editSkillEn"], value: record.en },
                  { name: ["editSkillFr"], value: record.fr },
                  {
                    name: ["editSkillCategoryId"],
                    value: record.categoryId,
                  },
                ]);
                handleEditModal(record);
              }}
            />
          </div>
        ),
      },
    ];

    return skillTableColumns;
  };

  /* Renders "Add Skill" modal */
  const addSkillButton = () => {
    return (
      <Modal
        visible={addVisible}
        title={<FormattedMessage id="admin.add.skill" />}
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
        <Form form={addForm} name="addSkill" layout="vertical">
          <Form.Item
            name="addSkillEn"
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
                id: "admin.add.skill.descriptionEn",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSkillFr"
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
                id: "admin.add.skill.descriptionFr",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addSkillCategory"
            label={<FormattedMessage id="admin.category" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "admin.validate.description",
                }),
              },
            ]}
          >
            <Select
              showSearch
              placeholder={`${intl.formatMessage({
                id: "admin.select",
              })} ${intl.formatMessage({
                id: "admin.category",
              })}`}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categories.data.map((category) => {
                return (
                  <Option value={category.id} key={category.id}>
                    {category[locale]}
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
        title={<FormattedMessage id="admin.skill.table" />}
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
            columns={skillTableColumns()}
            dataSource={data}
            loading={skills.loading || categories.loading}
          />
        </Col>
      </Row>
    </>
  );
};

SkillTableView.propTypes = {
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
  rowSelection: PropTypes.objectOf(PropTypes.any).isRequired,
};

SkillTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(SkillTableView);
