/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Modal,
  Popconfirm,
  Form,
  notification,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";
import { useHistory } from "react-router";
import handleError from "../../../functions/handleError";
import Header from "../../header/Header";

/**
 *  CategoryTableView(props)
 *  This component renders the category table for the Admin Category Page.
 */
const CategoryTableView = ({
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
  const [sortedData, setSortedData] = useState([]);

  const { data, loading } = useSelector((state) => state.admin.categories);
  const { locale } = useSelector((state) => state.settings);

  useEffect(() => {
    if (data && data.length > 0 && locale) {
      setSortedData(sortBy(data, locale === "ENGLISH" ? "en" : "fr"));
    }
  }, [locale, data]);

  let searchInput;

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
            id: "search.for",
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
  const popUpSuccess = () => {
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

  /* checks if deletion of category can occur */
  // Gives error prompt if deletion cannot occur
  const checkDelete = async () => {
    await handleSubmitDelete();
    popUpSuccess();
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
    popUpSuccess();
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
  const handleEditModal = (record) => {
    setEditVisible(true);
    setRecord(record);
    setModalType("edit");
  };

  /* handles render of "Add Category" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* Renders "Add Category" modal */
  const addCategoryButton = () => (
    <Modal
      visible={addVisible}
      title={<FormattedMessage id="add.category" />}
      okText={<FormattedMessage id="save" />}
      cancelText={<FormattedMessage id="cancel" />}
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
      onCancel={() => {
        addForm.resetFields();
        handleCancel();
      }}
    >
      <Form form={addForm} name="addCategory" layout="vertical">
        <Form.Item
          name="addCategoryEn"
          label={<FormattedMessage id="language.english" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="validate.description" />,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="addCategoryFr"
          label={<FormattedMessage id="language.french" />}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="validate.description" />,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.french.term",
            })}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  /* Renders "Edit Category" modal */
  const editCategoryButton = () => (
    <Modal
      visible={editVisible}
      title={<FormattedMessage id="edit.category" />}
      okText={<FormattedMessage id="save" />}
      cancelText={<FormattedMessage id="cancel" />}
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
          label={<FormattedMessage id="language.english" />}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
          />
        </Form.Item>
        <Form.Item
          name="editCategoryFr"
          label={<FormattedMessage id="language.french" />}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.french.term",
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => (
    <Popconfirm
      placement="left"
      title={<FormattedMessage id="delete.category" />}
      okText={<FormattedMessage id="delete" />}
      cancelText={<FormattedMessage id="cancel" />}
      onConfirm={() => {
        checkDelete().catch((error) => handleError(error, "message", history));
      }}
      onCancel={popUpCancel}
      disabled={selectedRowKeys.length === 0}
      overlayStyle={{ maxWidth: 350 }}
    >
      <Button disabled={selectedRowKeys.length === 0} danger>
        <DeleteOutlined />
        <span>
          <FormattedMessage id="delete" />
        </span>
      </Button>
    </Popconfirm>
  );

  /* Sets up the columns for the category table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const categoryTableColumns = () => [
    {
      title: <FormattedMessage id="language.english" />,
      dataIndex: "en",
      key: "en",
      sorter: (a, b) => a.en.localeCompare(b.en),
      sortDirections: locale === "ENGLISH" ? ["descend"] : undefined,
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
      sorter: (a, b) => a.fr.localeCompare(b.fr),
      sortDirections: locale === "FRENCH" ? ["descend"] : undefined,
      ...getColumnSearchProps(
        "fr",
        intl.formatMessage({
          id: "language.french",
        })
      ),
    },
    {
      title: <FormattedMessage id="edit" />,
      key: "edit",
      fixed: "right",
      width: 70,
      render: (record) => (
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setFields([
                { name: ["editCategoryEn"], value: record.en },
                { name: ["editCategoryFr"], value: record.fr },
              ]);
              handleEditModal(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {addCategoryButton()}
      {editCategoryButton()}
      <Header
        title={<FormattedMessage id="skill.categories.table" />}
        icon={<DatabaseOutlined />}
        extra={
          <>
            {deleteConfirm()}
            <Button type="primary" onClick={handleAddModal}>
              <PlusCircleOutlined />
              <span>
                <FormattedMessage id="add" />
              </span>
            </Button>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={categoryTableColumns()}
            dataSource={sortedData}
            loading={loading}
            scroll={{ x: 500 }}
          />
        </Col>
      </Row>
    </>
  );
};

CategoryTableView.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  rowSelection: PropTypes.objectOf(PropTypes.any),
};

CategoryTableView.defaultProps = {
  rowSelection: undefined,
};

export default CategoryTableView;
