/* eslint-disable no-shadow */
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  DatabaseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import { sortBy } from "lodash";
import PropTypes from "prop-types";

import filterOption from "../../../functions/filterSelectInput";
import handleError from "../../../functions/handleError";
import Header from "../../header/Header";

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
  rowSelection,
}) => {
  const history = useHistory();
  const intl = useIntl();
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
      const unsortedData = skills.data.map((skill) => {
        const category = categories.data.find(
          (category) => category.id === skill.categoryId
        );
        return {
          category: category
            ? category[locale === "ENGLISH" ? "en" : "fr"]
            : undefined,
          categoryId: skill.categoryId,
          en: skill.en,
          fr: skill.fr,
          id: skill.id,
          key: skill.id,
        };
      });

      setData(sortBy(unsortedData, locale === "ENGLISH" ? "en" : "fr"));
    }
  }, [skills, categories, locale]);

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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          placeholder={`${intl.formatMessage({
            id: "search.for",
          })} ${title}`}
          style={{ display: "block", marginBottom: 8, width: 188 }}
          value={selectedKeys[0]}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ marginRight: 8, width: 90 }}
          type="primary"
        >
          <FormattedMessage id="search" />
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          <FormattedMessage id="reset" />
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
          autoEscape
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    notification.success({
      message: intl.formatMessage({
        id: "successful",
      }),
    });
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "cancelled",
      }),
    });
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
  const deleteConfirm = () => (
    <Popconfirm
      cancelText={<FormattedMessage id="cancel" />}
      disabled={selectedRowKeys.length === 0}
      okText={<FormattedMessage id="delete" />}
      onCancel={() => {
        popUpCancel();
      }}
      onConfirm={() => {
        handleSubmitDelete()
          .then(popUpSuccesss)
          .catch((error) => handleError(error, "message", history));
      }}
      overlayStyle={{ maxWidth: 350 }}
      placement="left"
      title={<FormattedMessage id="delete.skill" />}
    >
      <Button danger disabled={selectedRowKeys.length === 0}>
        <DeleteOutlined />
        <span>
          <FormattedMessage id="delete" />
        </span>
      </Button>
    </Popconfirm>
  );

  /* Renders "Edit Skill" modal */
  const editSkillButton = () => (
    <Modal
      cancelText={<FormattedMessage id="cancel" />}
      okText={<FormattedMessage id="save" />}
      onCancel={() => {
        editForm.resetFields();
        handleCancel();
      }}
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
              handleError(error, "message", history);
            }
          });
      }}
      title={<FormattedMessage id="edit.skill" />}
      visible={editVisible}
    >
      <Form
        fields={fields}
        form={editForm}
        layout="vertical"
        name="editSkill"
        onFieldsChange={() => {
          setFields([{}]);
        }}
      >
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="editSkillEn"
          rules={[
            {
              message: <FormattedMessage id="validate.description" />,
              required: true,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="editSkillFr"
          rules={[
            {
              message: <FormattedMessage id="validate.description" />,
              required: true,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.french.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="category" />}
          name="editSkillCategoryId"
          rules={[
            {
              message: intl.formatMessage({
                id: "validate.description",
              }),
              required: true,
            },
          ]}
        >
          <Select
            filterOption={filterOption}
            placeholder={`${intl.formatMessage({
              id: "select",
            })} ${intl.formatMessage({
              id: "category",
            })}`}
            showSearch
          >
            {categories.data.map((category) => (
              <Option key={category.id} value={category.id}>
                {category[locale === "ENGLISH" ? "en" : "fr"]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );

  /* Sets up the columns for the skill table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const skillTableColumns = () => [
    {
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      title: <FormattedMessage id="category" />,
      ...getColumnSearchProps(
        "category",
        intl.formatMessage({
          id: "category",
        })
      ),
    },
    {
      dataIndex: "en",
      key: "en",
      sortDirections: locale === "ENGLISH" ? ["descend"] : undefined,
      sorter: (a, b) => a.en.localeCompare(b.en),
      title: <FormattedMessage id="language.english" />,
      ...getColumnSearchProps(
        "en",
        intl.formatMessage({
          id: "language.english",
        })
      ),
    },
    {
      dataIndex: "fr",
      key: "fr",
      sortDirections: locale === "FRENCH" ? ["descend"] : undefined,
      sorter: (a, b) => a.fr.localeCompare(b.fr),
      title: <FormattedMessage id="language.french" />,
      ...getColumnSearchProps(
        "fr",
        intl.formatMessage({
          id: "language.french",
        })
      ),
    },
    {
      fixed: "right",
      key: "edit",
      render: (record) => (
        <div>
          <Button
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
            shape="circle"
            type="primary"
          />
        </div>
      ),
      title: <FormattedMessage id="edit" />,
      width: 70,
    },
  ];

  /* Renders "Add Skill" modal */
  const addSkillButton = () => (
    <Modal
      cancelText={<FormattedMessage id="cancel" />}
      okText={<FormattedMessage id="save" />}
      onCancel={() => {
        addForm.resetFields();
        handleCancel();
      }}
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
              handleError(error, "message", history);
            }
          });
      }}
      title={<FormattedMessage id="add.skill" />}
      visible={addVisible}
    >
      <Form form={addForm} layout="vertical" name="addSkill">
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="addSkillEn"
          rules={[
            {
              message: <FormattedMessage id="validate.description" />,
              required: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="addSkillFr"
          rules={[
            {
              message: <FormattedMessage id="validate.description" />,
              required: true,
            },
          ]}
        >
          <Input
            allowClear
            placeholder={intl.formatMessage({
              id: "add.french.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="category" />}
          name="addSkillCategory"
          rules={[
            {
              message: intl.formatMessage({
                id: "validate.description",
              }),
              required: true,
            },
          ]}
        >
          <Select
            filterOption={filterOption}
            placeholder={`${intl.formatMessage({
              id: "select",
            })} ${intl.formatMessage({
              id: "category",
            })}`}
            showSearch
          >
            {categories.data.map((category) => (
              <Option key={category.id} value={category.id}>
                {category[locale === "ENGLISH" ? "en" : "fr"]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      {addSkillButton()}
      {editSkillButton()}
      <Header
        extra={
          <>
            {deleteConfirm()}
            <Button onClick={handleAddModal} type="primary">
              <PlusCircleOutlined />
              <span>
                <FormattedMessage id="add" />
              </span>
            </Button>
          </>
        }
        icon={<DatabaseOutlined />}
        title={<FormattedMessage id="skills" />}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={skillTableColumns()}
            dataSource={data}
            loading={skills.loading || categories.loading}
            rowSelection={rowSelection}
            scroll={{ x: 800 }}
          />
        </Col>
      </Row>
    </>
  );
};

SkillTableView.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  rowSelection: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SkillTableView;
