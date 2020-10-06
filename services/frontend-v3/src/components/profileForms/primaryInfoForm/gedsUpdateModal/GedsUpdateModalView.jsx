import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd";
import { SyncOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { isMobilePhone } from "validator";
import { Prompt } from "react-router";
import useAxios from "../../../../utils/axios-instance";

const GedsUpdateModalView = ({ visibility, profile, setVisibility }) => {
  const axios = useAxios();
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [savedProfile, setSavedProfile] = useState(profile);
  const [tableData, setTableData] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

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
    // if (!formValues.jobTitle[locale]) {
    //   dbValues.jobTitle = {
    //     [locale]: formValues.jobTitle,
    //   };
    // }
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
        updatedProfile.firstName = newGedsValues.firstName;
        break;
      case "lastName":
        updatedProfile.lastName = newGedsValues.lastName;
        break;
      case "jobTitle":
        updatedProfile.jobTitle = {
          ["ENGLISH"]: newGedsValues.jobTitle["ENGLISH"],
          ["FRENCH"]: newGedsValues.jobTitle["FRENCH"],
        };
        break;
      case "branch":
        updatedProfile.jobTitle = {
          ["ENGLISH"]: newGedsValues.branch["ENGLISH"],
          ["FRENCH"]: newGedsValues.branch["FRENCH"],
        };
        break;
      case "organization":
        updatedProfile.organizations = newGedsValues.organizations;
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
        rowName: "First Name",
        saved: savedProfile.firstName,
        geds: gedsProfile ? gedsProfile.firstName : "-",
        paramName: "firstName",
      },
      {
        key: "2",
        rowName: "Last Name",
        saved: savedProfile.lastName,
        geds: gedsProfile ? gedsProfile.lastName : "-",
        paramName: "lastName",
      },
      {
        key: "3",
        rowName: "Job Title",
        saved: savedProfile.jobTitle,
        geds: gedsProfile ? gedsProfile.jobTitle.ENGLISH : "-",
        paramName: "jobTitle",
      },
      {
        key: "4",
        rowName: "Branch",
        saved: savedProfile.branch,
        geds: gedsProfile ? gedsProfile.branch.ENGLISH : "-",
        paramName: "branch",
      },
      {
        key: "5",
        rowName: "Organization",
        saved: savedProfile.organizations[0]
          ? savedProfile.organizations[0][
              savedProfile.organizations[0].length - 1
            ].title
          : "-",
        geds: gedsProfile
          ? gedsProfile.organizations[0][
              gedsProfile.organizations[0].length - 1
            ].title.ENGLISH
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
      const result = await axios.get(
        `api/profile/private/${id}?language=${locale}`
      );
      return result.data;
    }
  };

  /**
   * Make API call to get profile info from Geds
   */
  const getGedsInfo = async () => {
    const result = await axios.get(`api/profGen/${id}`, {
      params: {
        name,
      },
    });

    return result.data;
  };

  /**
   * Make all API calls and update data in states
   */
  const getGedsAndProfileInfo = async () => {
    let profile = await getProfileInfo();
    let gedsProfile = await getGedsInfo();
    updateAllData({ savedProfile: profile, gedsProfile: gedsProfile });
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
      title: "Saved Info",
      dataIndex: "saved",
      key: "saved",
      width: "30%",
      ellipsis: true,
    },
    {
      title: "Geds Info",
      dataIndex: "geds",
      key: "geds",
      width: "30%",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          size="small"
          disabled={isEqual(record.saved, record.geds)}
          icon={
            isEqual(record.saved, record.geds) ? (
              <CheckOutlined />
            ) : (
              <SyncOutlined />
            )
          }
          onClick={() => syncGedsButtonAction({ paramName: record.paramName })}
        >
          {isEqual(record.saved, record.geds) ? "Synced" : "Sync"}
        </Button>
      ),
    },
  ];

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
      onOk={() => setVisibility(false)}
      onCancel={() => setVisibility(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => setVisibility(false)}
        >
          Done
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        size="small"
        loading={!tableData || tableLoading}
      />
    </Modal>
  );
};

GedsUpdateModalView.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default GedsUpdateModalView;
