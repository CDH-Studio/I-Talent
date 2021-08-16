import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
 *  DiplomaTableView(props)
 *  This component renders the diploma table for the Admin Diploma Page.
 */
const DiplomaTableView = ({
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

  let searchInput;

  const { data, loading } = useSelector((state) => state.admin.diplomas);
  const { locale } = useSelector((state) => state.settings);

  useEffect(() => {
    if (data && locale) {
      setSortedData(sortBy(data, locale === "ENGLISH" ? "en" : "fr"));
    }
  }, [locale, data]);

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
          style={{ width: 188, marginBottom: 8, display: "block" }}
          value={selectedKeys[0]}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
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
    onFilter: (value, currentRecord) =>
      currentRecord[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
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
      title={<FormattedMessage id="delete.diploma" />}
    >
      <Button danger disabled={selectedRowKeys.length === 0}>
        <DeleteOutlined />
        <span>
          <FormattedMessage id="delete" />
        </span>
      </Button>
    </Popconfirm>
  );

  /* handles closure of add or edit diploma modal */
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

  /* handles closure of add or edit diploma modal */
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

  /* handles render of "Edit Diploma" modal */
  const handleEditModal = (item) => {
    setEditVisible(true);
    setRecord(item);
    setModalType("edit");
  };

  /* handles render of "Add Diploma" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* Renders "Add Diploma" modal */
  const addDiplomaModal = () => (
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
      title={<FormattedMessage id="add.diploma" />}
      visible={addVisible}
    >
      <Form form={addForm} layout="vertical" name="addDiploma">
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="addDiplomaEn"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="validate.description" />,
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
          name="addDiplomaFr"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="validate.description" />,
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

  /* Renders "Edit Diploma" modal */
  const editDiplomaModal = () => (
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
      title={<FormattedMessage id="edit.diploma" />}
      visible={editVisible}
    >
      <Form
        fields={fields}
        form={editForm}
        layout="vertical"
        name="editDiploma"
        onFieldsChange={() => {
          setFields([{}]);
        }}
      >
        <Form.Item
          label={<FormattedMessage id="language.english" />}
          name="editDiplomaEn"
        >
          <Input
            placeholder={intl.formatMessage({
              id: "add.english.term",
            })}
          />
        </Form.Item>
        <Form.Item
          label={<FormattedMessage id="language.french" />}
          name="editDiplomaFr"
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

  /* Sets up the columns for the diploma table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const diplomaTableColumns = () => [
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
      render: (item) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setFields([
                { name: ["editDiplomaEn"], value: item.en },
                { name: ["editDiplomaFr"], value: item.fr },
              ]);
              handleEditModal(item);
            }}
            shape="circle"
            type="primary"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {addDiplomaModal()}
      {editDiplomaModal()}
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
        title={<FormattedMessage id="diplomas" />}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            columns={diplomaTableColumns()}
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

DiplomaTableView.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  rowSelection: PropTypes.shape({
    onChange: PropTypes.func,
  }).isRequired,
  searchText: PropTypes.string.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default DiplomaTableView;
