import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Result } from "antd";
import { SyncOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxios from "../../../../utils/axios-instance";

const GedsUpdateModalView = ({ visibility, profile, setVisibility }) => {
  const axios = useAxios();
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [savedProfile, setSavedProfile] = useState(profile);
  const [tableData, setTableData] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [errorCaught, setErrorCaught] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const { id, name } = useSelector((state) => state.user);

  /**
   * Save Data to DB by sending to backend API
   * @param {Object} formValues - Data from primary info form.
   */
  const saveDataToDB = async (formValues) => {
    const dbValues = {
      ...formValues,
    };
    await axios.put(`api/profile/${id}?language=${locale}`, dbValues);
  };

  /**
   * Prepare data and update DB based on geds data sync requested
   * @param {string} paramName - name of the element being requested to sync.
   */
  const syncGedsButtonAction = async ({ paramName }) => {
    setTableLoading(true);

    let updatedProfile = {};

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
              ["ENGLISH"]: newGedsValues.jobTitle["ENGLISH"],
              ["FRENCH"]: newGedsValues.jobTitle["FRENCH"],
            }
          : null;
        break;
      case "branch":
        updatedProfile.jobTitle = newGedsValues.branch
          ? {
              ["ENGLISH"]: newGedsValues.branch["ENGLISH"],
              ["FRENCH"]: newGedsValues.branch["FRENCH"],
            }
          : null;
        break;
      case "organization":
        updatedProfile.organizations = newGedsValues.organizations
          ? newGedsValues.organizations
          : null;
        break;
      default:
        throw "sync request category not recognized";
    }
    await saveDataToDB(updatedProfile);
    await getGedsAndProfileInfo();
    setTableLoading(false);
  };

  /**
   * Update the datable data based in saved profile and Geds profile
   * @param {Object} savedProfile - saved profile data.
   * @param {Object} gedsProfile - profile from geds.
   */
  const updateAllData = ({ savedProfile, gedsProfile }) => {
    const updatedTableData = [
      {
        key: "1",
        rowName: <FormattedMessage id="profile.first.name" />,
        savedLabel: savedProfile.firstName ? savedProfile.firstName : "-",
        savedValue: savedProfile.firstName ? savedProfile.firstName : "-",
        gedsLabel: gedsProfile.firstName ? gedsProfile.firstName : "-",
        gedsValue: gedsProfile.firstName ? gedsProfile.firstName : "-",
        paramName: "firstName",
      },
      {
        key: "2",
        rowName: <FormattedMessage id="profile.last.name" />,
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
        rowName: <FormattedMessage id="profile.location" />,
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
        rowName: <FormattedMessage id="profile.career.header.name" />,
        savedLabel: savedProfile.jobTitle ? savedProfile.jobTitle : "-",
        savedValue: savedProfile.jobTitle ? savedProfile.jobTitle : "-",
        gedsLabel: gedsProfile.jobTitle ? gedsProfile.jobTitle[locale] : "-",
        gedsValue: gedsProfile.jobTitle ? gedsProfile.jobTitle[locale] : "-",
        paramName: "jobTitle",
      },
      {
        key: "6",
        rowName: <FormattedMessage id="profile.branch" />,
        savedLabel: savedProfile.branch,
        savedValue: savedProfile.branch,
        gedsLabel: gedsProfile ? gedsProfile.branch[locale] : "-",
        gedsValue: gedsProfile ? gedsProfile.branch[locale] : "-",
        paramName: "branch",
      },
      {
        key: "7",
        rowName: <FormattedMessage id="profile.org.tree" />,
        savedLabel: savedProfile.organizations[0]
          ? savedProfile.organizations[0][
              savedProfile.organizations[0].length - 1
            ].title
          : "-",
        savedValue: savedProfile.organizations[0]
          ? savedProfile.organizations[0][
              savedProfile.organizations[0].length - 1
            ].title
          : "-",
        gedsLabel: gedsProfile
          ? gedsProfile.organizations[0][
              gedsProfile.organizations[0].length - 1
            ].title[locale]
          : "-",
        gedsValue: gedsProfile
          ? gedsProfile.organizations[0][
              gedsProfile.organizations[0].length - 1
            ].title[locale]
          : "-",
        paramName: "organization",
      },
    ];

    setTableData(updatedTableData);
    setNewGedsValues(gedsProfile);
    setSavedProfile(savedProfile);
  };

  /**
   * Make API call to get saved profile info
   */
  const getProfileInfo = async () => {
    if (id) {
      try {
        const result = await axios.get(
          `api/profile/private/${id}?language=${locale}`
        );
        return result.data;
      } catch (error) {
        throw error;
      }
    }
  };

  /**
   * Make API call to get profile info from Geds
   */
  const getGedsInfo = async () => {
    try {
      const result = await axios.get(`api/profGen/${id}`, {
        params: {
          name,
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Make all API calls and update data in states
   */
  const getGedsAndProfileInfo = async () => {
    try {
      let profile = await getProfileInfo();
      let gedsProfile = await getGedsInfo();
      updateAllData({ savedProfile: profile, gedsProfile: gedsProfile });
    } catch {
      setErrorCaught(true);
    }
  };

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
      title: <FormattedMessage id="profile.geds.update.saved" />,
      dataIndex: "savedLabel",
      key: "saved",
      width: "30%",
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="profile.geds.update.geds" />,
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
              <CheckOutlined style={{ marginRight: "4px" }} />
            ) : (
              <SyncOutlined style={{ marginRight: "4px" }} />
            )
          }
          onClick={() => syncGedsButtonAction({ paramName: record.paramName })}
        >
          {isEqual(record.savedValue, record.gedsValue) ? (
            <FormattedMessage id="profile.geds.update.synced" />
          ) : (
            <FormattedMessage id="profile.geds.update.sync" />
          )}
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
      setSavedProfile(null);
      setTableData(null);
      getGedsAndProfileInfo();
    }
  }, [visibility]);

  /** **********************************
   ********* Render Component *********
   *********************************** */

  return (
    <Modal
      title="GC Directory Sync"
      visible={visibility}
      width={900}
      onOk={onDone}
      onCancel={onDone}
      footer={[
        <Button key="submit" type="primary" onClick={onDone}>
          <FormattedMessage id="profile.geds.update.finish" />
        </Button>,
      ]}
    >
      {errorCaught ? (
        <Result
          status={<FormattedMessage id="profile.geds.update.error.header" />}
          title={<FormattedMessage id="profile.geds.update.error.message" />}
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
  setVisibility: PropTypes.func.isRequired,
};

export default GedsUpdateModalView;
