/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
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
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";

import { IntlPropType } from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import Header from "../../header/Header";

/**
 *  CompetencyTableView(props)
 *  This component renders the competency table for the Admin Competency Page.
 */
const CompetencyTableView = ({
  intl,
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
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [modalType, setModalType] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([{}]);
  const [sortedData, setSortedData] = useState([]);

  let searchInput;

  const { data, loading } = useSelector((state) => state.admin.competencies);
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

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    notification.success({
      message: intl.formatMessage({
        id: "admin.success",
      }),
    });
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    notification.info({
      message: intl.formatMessage({
        id: "admin.cancelled",
      }),
    });
  };

  /* Renders the delete button and confirmation prompt */
  const deleteConfirm = () => {
    return (
      <Popconfirm
        placement="left"
        title={<FormattedMessage id="admin.delete.competency" />}
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
        disabled={selectedRowKeys.length === 0}
        overlayStyle={{ maxWidth: 350 }}
      >
        <Button disabled={selectedRowKeys.length === 0} danger>
          <DeleteOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.delete" />
        </Button>
      </Popconfirm>
    );
  };

  /* handles closure of add or edit competency modal */
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

  /* handles closure of add or edit competency modal */
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

  /* handles render of "Edit Competency" modal */
  const handleEditModal = (record) => {
    setEditVisible(true);
    setRecord(record);
    setModalType("edit");
  };

  /* handles render of "Add Competency" modal */
  const handleAddModal = () => {
    setAddVisible(true);
    setModalType("add");
  };

  /* Renders "Add Competency" modal */
  const addCompetencyModal = () => {
    return (
      <Modal
        visible={addVisible}
        title={<FormattedMessage id="admin.add.competency" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onOk={async () => {
          addForm
            .validateFields()
            .then(async (values) => {
              await handleSubmitAdd(values);
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
        <Form form={addForm} name="addCompetency" layout="vertical">
          <Form.Item
            name="addCompetencyEn"
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
                id: "admin.add.competency.descriptionEn",
              })}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="addCompetencyFr"
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
                id: "admin.add.competency.descriptionFr",
              })}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Renders "Edit Competency" modal */
  const editCompetencyModal = () => {
    return (
      <Modal
        visible={editVisible}
        title={<FormattedMessage id="admin.edit.competency" />}
        okText={<FormattedMessage id="admin.apply" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onOk={async () => {
          editForm
            .validateFields()
            .then(async (values) => {
              await handleSubmitEdit(values, record.id);
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
          name="editCompetency"
          layout="vertical"
          fields={fields}
          onFieldsChange={() => {
            setFields([{}]);
          }}
        >
          <Form.Item
            name="editCompetencyEn"
            label={<FormattedMessage id="language.english" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.competency.descriptionEn",
              })}
            />
          </Form.Item>
          <Form.Item
            name="editCompetencyFr"
            label={<FormattedMessage id="language.french" />}
          >
            <Input
              placeholder={intl.formatMessage({
                id: "admin.add.competency.descriptionFr",
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  /* Sets up the columns for the competency table */
  // Table columns data structure: array of objects
  // Consult: Ant Design table components for further clarification
  const competencyTableColumns = () => [
    {
      title: <FormattedMessage id="language.english" />,
      dataIndex: "en",
      key: "en",
      sorter: (a, b) => {
        return a.en.localeCompare(b.en);
      },
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
      sorter: (a, b) => {
        return a.fr.localeCompare(b.fr);
      },
      sortDirections: locale === "FRENCH" ? ["descend"] : undefined,
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
                { name: ["editCompetencyEn"], value: record.en },
                { name: ["editCompetencyFr"], value: record.fr },
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
      {addCompetencyModal()}
      {editCompetencyModal()}
      <Header
        title={<FormattedMessage id="admin.competency.table" />}
        extra={
          <>
            {deleteConfirm()}
            <Button type="primary" onClick={handleAddModal}>
              <PlusCircleOutlined style={{ marginRight: 10 }} />
              <FormattedMessage id="admin.add" />
            </Button>
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            showSorterTooltip={false}
            rowSelection={rowSelection}
            columns={competencyTableColumns()}
            dataSource={sortedData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

CompetencyTableView.propTypes = {
  intl: IntlPropType,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmitAdd: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleSubmitDelete: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  rowSelection: PropTypes.objectOf(PropTypes.any).isRequired,
};

CompetencyTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(CompetencyTableView);
