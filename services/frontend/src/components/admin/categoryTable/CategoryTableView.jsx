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
  Table,
} from "antd";
import { sortBy } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
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
  const [recordState, setRecordState] = useState({});
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
      setRecordState(null);
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
    setRecordState(record);
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
      title={<FormattedMessage id="add.category" />}
      visible={addVisible}
    >
      <Form form={addForm} layout="vertical" name="addCategory">
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="addCategoryEn"
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
          name="addCategoryFr"
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
      </Form>
    </Modal>
  );

  /* Renders "Edit Category" modal */
  const editCategoryButton = () => (
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
            await handleSubmitEdit(values, recordState.id);
            editForm.resetFields();
            handleOk();
          })
          .catch((error) => {
            if (error.isAxiosError) {
              handleError(error, "message", history);
            }
          });
      }}
      title={<FormattedMessage id="edit.category" />}
      visible={editVisible}
    >
      <Form
        fields={fields}
        form={editForm}
        layout="vertical"
        name="editCategory"
        onFieldsChange={() => {
          setFields([{}]);
        }}
      >
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="editCategoryEn"
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="editCategoryFr"
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
      cancelText={<FormattedMessage id="cancel" />}
      disabled={selectedRowKeys.length === 0}
      okText={<FormattedMessage id="delete" />}
      onCancel={popUpCancel}
      onConfirm={() => {
        checkDelete().catch((error) => handleError(error, "message", history));
      }}
      overlayStyle={{ maxWidth: 350 }}
      placement="left"
      title={<FormattedMessage id="delete.category" />}
    >
      <Button danger disabled={selectedRowKeys.length === 0}>
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
                { name: ["editCategoryEn"], value: record.en },
                { name: ["editCategoryFr"], value: record.fr },
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

  return (
    <>
      {addCategoryButton()}
      {editCategoryButton()}
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
        title={<FormattedMessage id="skill.categories.table" />}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={categoryTableColumns()}
            dataSource={sortedData}
            loading={loading}
            rowSelection={rowSelection}
            scroll={{ x: 500 }}
          />
        </Col>
      </Row>
    </>
  );
};

CategoryTableView.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  rowSelection: PropTypes.objectOf(PropTypes.any),
  searchText: PropTypes.string.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
};

CategoryTableView.defaultProps = {
  rowSelection: undefined,
};

export default CategoryTableView;
