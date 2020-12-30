import { useState, useEffect, useCallback } from "react";
import { Modal, Table, Button, Result } from "antd";
import { SyncOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../../../../utils/useAxios";

/**
 * Parse and generate table data based in saved profile and GEDS
 * @param {Object} savedProfile - saved profile data.
 * @param {Object} gedsProfile - profile from geds.
 */
const generateTableData = ({ savedProfile, gedsProfile, locale }) => [
  {
    key: "1",
    rowName: <FormattedMessage id="first.name" />,
    savedLabel: savedProfile.firstName ? savedProfile.firstName : "-",
    savedValue: savedProfile.firstName ? savedProfile.firstName : "-",
    gedsLabel: gedsProfile.firstName ? gedsProfile.firstName : "-",
    gedsValue: gedsProfile.firstName ? gedsProfile.firstName : "-",
    paramName: "firstName",
  },
  {
    key: "2",
    rowName: <FormattedMessage id="last.name" />,
    savedLabel: savedProfile.lastName ? savedProfile.lastName : "-",
    savedValue: savedProfile.lastName ? savedProfile.lastName : "-",
    gedsLabel: gedsProfile.lastName ? gedsProfile.lastName : "-",
    gedsValue: gedsProfile.lastName ? gedsProfile.lastName : "-",
    paramName: "lastName",
  },
  {
    key: "3",
    rowName: <FormattedMessage id="profile.telephone" />,
    savedLabel: savedProfile.telephone ? savedProfile.telephone : "-",
    savedValue: savedProfile.telephone ? savedProfile.telephone : "-",
    gedsLabel: gedsProfile.telephone ? gedsProfile.telephone : "-",
    gedsValue: gedsProfile.telephone ? gedsProfile.telephone : "-",
    paramName: "telephone",
  },
  {
    key: "4",
    rowName: <FormattedMessage id="work.location" />,
    savedLabel: savedProfile.officeLocation
      ? `${savedProfile.officeLocation.streetNumber} ${savedProfile.officeLocation.streetName}, ${savedProfile.officeLocation.city}`
      : "-",
    savedValue: savedProfile.officeLocation
      ? savedProfile.officeLocation.id
      : "-",
    gedsLabel: gedsProfile.locationName ? gedsProfile.locationName : "-",
    gedsValue: gedsProfile.locationId ? gedsProfile.locationId : "-",
    paramName: "location",
  },
  {
    key: "5",
    rowName: <FormattedMessage id="job.title" />,
    savedLabel: savedProfile.jobTitle ? savedProfile.jobTitle : "-",
    savedValue: savedProfile.jobTitle ? savedProfile.jobTitle : "-",
    gedsLabel: gedsProfile.jobTitle ? gedsProfile.jobTitle[locale] : "-",
    gedsValue: gedsProfile.jobTitle ? gedsProfile.jobTitle[locale] : "-",
    paramName: "jobTitle",
  },
  {
    key: "6",
    rowName: <FormattedMessage id="branch" />,
    savedLabel: savedProfile.branch ? gedsProfile.branch[locale] : "-",
    savedValue: savedProfile.branch ? gedsProfile.branch[locale] : "-",
    gedsLabel: gedsProfile.branch ? gedsProfile.branch[locale] : "-",
    gedsValue: gedsProfile.branch ? gedsProfile.branch[locale] : "-",
    paramName: "branch",
  },
  {
    key: "7",
    rowName: <FormattedMessage id="profile.org.tree" />,
    savedLabel: savedProfile.organizations[0]
      ? savedProfile.organizations[0][savedProfile.organizations[0].length - 1]
          .title
      : "-",
    savedValue: savedProfile.organizations[0]
      ? savedProfile.organizations[0][savedProfile.organizations[0].length - 1]
          .title
      : "-",
    gedsLabel: savedProfile.organizations
      ? gedsProfile.organizations[0][gedsProfile.organizations[0].length - 1]
          .title[locale]
      : "-",
    gedsValue: savedProfile.organizations
      ? gedsProfile.organizations[0][gedsProfile.organizations[0].length - 1]
          .title[locale]
      : "-",
    paramName: "organization",
  },
];

/**
 * Component to render the GC directory Sync modal
 * @param {Boolean} visibility - visibility of modal.
 */
const GedsUpdateModalView = ({ visibility, saveDataToDB }) => {
  const axios = useAxios();
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [errorCaught, setErrorCaught] = useState(false);
  const { locale } = useSelector((state) => state.settings);
  const { id, email } = useSelector((state) => state.user);

  /**
   * Make all API calls and update data in states
   */
  const getGedsAndProfileInfo = useCallback(async () => {
    try {
      // get saved user profile
      const profileResult = await axios.get(
        `api/profile/private/${id}?language=${locale}`
      );

      // get profile form geds
      const gedsResult = await axios.get(`api/profGen/${id}`, {
        params: {
          email,
        },
      });

      setNewGedsValues(gedsResult.data);

      setTableData(
        generateTableData({
          savedProfile: profileResult.data,
          gedsProfile: gedsResult.data,
          locale,
        })
      );
    } catch (error) {
      setErrorCaught(true);
    }
  }, [id, locale, axios, email]);

  /**
   * Prepare data and update DB based on geds data sync requested
   * @param {string} paramName - name of the element being requested to sync.
   */
  const syncGedsButtonAction = async ({ paramName }) => {
    setTableLoading(true);

    const updatedProfile = {};

    switch (paramName) {
      case "firstName":
        updatedProfile.firstName = newGedsValues.firstName
          ? newGedsValues.firstName
          : null;
        break;
      case "lastName":
        updatedProfile.lastName = newGedsValues.lastName
          ? newGedsValues.lastName
          : null;
        break;
      case "telephone":
        updatedProfile.telephone = newGedsValues.telephone
          ? newGedsValues.telephone
          : null;
        break;
      case "location":
        updatedProfile.locationId = newGedsValues.locationId
          ? newGedsValues.locationId
          : null;
        break;
      case "jobTitle":
        updatedProfile.jobTitle = newGedsValues.jobTitle
          ? {
              ENGLISH: newGedsValues.jobTitle.ENGLISH,
              FRENCH: newGedsValues.jobTitle.FRENCH,
            }
          : null;
        break;
      case "branch":
        updatedProfile.branch = newGedsValues.branch
          ? {
              ENGLISH: newGedsValues.branch.ENGLISH,
              FRENCH: newGedsValues.branch.FRENCH,
            }
          : null;
        break;
      case "organization":
        updatedProfile.organizations = newGedsValues.organizations
          ? newGedsValues.organizations
          : null;
        break;
      default:
        throw new Error("sync request category not recognized");
    }
    await saveDataToDB(updatedProfile);
    await getGedsAndProfileInfo();
    setTableLoading(false);
  };

  /**
   * columns of antd table
   */
  const columns = [
    {
      title: "",
      dataIndex: "rowName",
      key: "rowName",
      render: (text) => <strong>{text}</strong>,
      width: "20%",
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="geds.update.saved" />,
      dataIndex: "savedLabel",
      key: "saved",
      width: "30%",
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="geds.update.geds" />,
      dataIndex: "gedsLabel",
      key: "geds",
      width: "30%",
      ellipsis: true,
    },
    {
      key: "action",
      align: "center",
      render: (text, record) => (
        <Button
          type="primary"
          size="small"
          disabled={isEqual(record.savedValue, record.gedsValue)}
          icon={
            isEqual(record.savedValue, record.gedsValue) ? (
              <CheckOutlined />
            ) : (
              <SyncOutlined />
            )
          }
          onClick={() => syncGedsButtonAction({ paramName: record.paramName })}
        >
          <span>
            {isEqual(record.savedValue, record.gedsValue) ? (
              <FormattedMessage id="geds.update.synced" />
            ) : (
              <FormattedMessage id="geds.update.sync" />
            )}
          </span>
        </Button>
      ),
    },
  ];

  /**
   * Close the modal and reload page
   */
  const onDone = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    if (visibility) {
      setNewGedsValues(null);
      setTableData(null);
      getGedsAndProfileInfo();
    }
  }, [visibility, getGedsAndProfileInfo]);

  /** **********************************
   ********* Render Component *********
   *********************************** */

  return (
    <Modal
      title={<FormattedMessage id="geds.sync.button" />}
      visible={visibility}
      width={900}
      onOk={onDone}
      onCancel={onDone}
      footer={[
        <Button key="submit" type="primary" onClick={onDone}>
          <FormattedMessage id="geds.update.finish" />
        </Button>,
      ]}
    >
      {errorCaught ? (
        <Result
          status="warning"
          title={<FormattedMessage id="geds.update.error.message" />}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          size="small"
          loading={!tableData || tableLoading}
        />
      )}
    </Modal>
  );
};

GedsUpdateModalView.propTypes = {
  visibility: PropTypes.bool.isRequired,
  saveDataToDB: PropTypes.func.isRequired,
};

export default GedsUpdateModalView;
