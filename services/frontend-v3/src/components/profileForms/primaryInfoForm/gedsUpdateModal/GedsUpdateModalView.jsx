import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spin, Table, Button } from "antd";
import { SyncOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { isEqual, identity, pickBy, find } from "lodash";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isMobilePhone } from "validator";
import { Prompt } from "react-router";
import useAxios from "../../../../utils/axios-instance";

const GedsUpdateModalView = ({ visibility, profile, setVisibility }) => {
  const axios = useAxios();
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [gedsModalVisible, setGedsModalVisible] = useState(false);
  const [savedProfile, setSavedProfile] = useState(profile);
  const [tableData, setTableData] = useState(null);
  const [syncNeeded, setSyncNeeded] = useState(true);

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
    if (!formValues.jobTitle[locale]) {
      dbValues.jobTitle = {
        [locale]: formValues.jobTitle,
      };
    }
    await axios.put(`api/profile/${id}?language=${locale}`, dbValues);
  };

  const syncGedsButtonAction = async ({ paramName }) => {
    setTableLoading(true);
    let updatedProfile = { ...savedProfile };

    // delete updatedProfile.jobTitle;
    // updatedProfile.jobTitle = savedProfile.jobTitle;
    updatedProfile.jobTitle = {
      [locale]: savedProfile.jobTitle,
    };

    // delete updatedProfile.branch;
    updatedProfile.branch = {
      [locale]: savedProfile.branch,
    };

    updatedProfile.organization = savedProfile.organization;

    switch (paramName) {
      case "firstName":
        updatedProfile.firstName = newGedsValues.firstName;
        break;
      case "lastName":
        updatedProfile.lastName = newGedsValues.lastName;
        break;
      case "jobTitle":
        updatedProfile.jobTitle["ENGLISH"] = newGedsValues.jobTitle["ENGLISH"];
        updatedProfile.jobTitle["FRENCH"] = newGedsValues.jobTitle["FRENCH"];
        break;
      case "branch":
        updatedProfile.branch["ENGLISH"] = newGedsValues.branch["ENGLISH"];
        updatedProfile.branch["FRENCH"] = newGedsValues.branch["FRENCH"];
        break;
      case "organization":
        updatedProfile.organizations = newGedsValues.organizations;
      default:
      // code block
    }

    await saveDataToDB(updatedProfile);
    await getGedsAndProfileInfo();
    setTableLoading(false);
  };

  /** **********************************
   ********* Render Component *********
   *********************************** */
  const updateTableData = ({ savedProfile, gedsProfile }) => {
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
        row: "Last Name",
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

  const columns = [
    {
      title: "",
      dataIndex: "rowName",
      key: "rowName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Saved Info",
      dataIndex: "saved",
      key: "saved",
    },
    {
      title: "Geds Info",
      dataIndex: "geds",
      key: "geds",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          size="small"
          disabled={record.saved == record.geds}
          icon={
            record.saved == record.geds ? <CheckOutlined /> : <SyncOutlined />
          }
          onClick={() => syncGedsButtonAction({ paramName: record.paramName })}
        >
          {record.saved == record.geds ? "Synced" : "Sync"}
        </Button>
      ),
    },
  ];

  // useEffect(() => {
  //   if (id) {
  //       const result = await axios.get(
  //         `api/profile/private/${id}?language=${locale}`
  //       );
  //       setSavedProfile(result.data);
  //   }
  // });

  // Get user profile for form drop down
  const getProfileInfo = async () => {
    if (id) {
      const result = await axios.get(
        `api/profile/private/${id}?language=${locale}`
      );
      //setSavedProfile(result.data);
      return result.data;
      //setTableData(getData({ savedProfileValue: savedProfile }));
    }
  };

  const getGedsInfo = async () => {
    const result = await axios.get(`api/profGen/${id}`, {
      params: {
        name,
      },
    });

    return result.data;

    // console.log(result.data);
    // setNewGedsValues(result.data);
    // .catch((error) => {
    //  throw error;
    // openNotificationWithIcon({
    //   type: "warning",
    //   description: intl.formatMessage({
    //     id: "profile.geds.failed.to.retrieve",
    //   }),
    // });
    //   throw error;
    // });
  };

  const getGedsAndProfileInfo = async () => {
    let profile = await getProfileInfo();
    let gedsProfile = await getGedsInfo();
    updateTableData({ savedProfile: profile, gedsProfile: gedsProfile });
  };

  useEffect(() => {
    if (syncNeeded & visibility) {
      getGedsAndProfileInfo();
    }
  }, [visibility]);

  // useEffect(() => {
  //   setTableData(getData({ savedProfileValue: savedProfile }));
  //   // console.log(getData());
  // }, [newGedsValues, savedProfile]);

  //   // Get user profile for form drop down
  //   const getProfileInfo = useCallback(async () => {
  //     if (id) {
  //       const result = await axios.get(
  //         `api/profile/private/${id}?language=${locale}`
  //       );
  //       setSavedProfile(result.data);
  //     }
  //   }, [axios, id, locale]);

  return (
    <Modal
      title="GC Directory Sync"
      visible={visibility}
      width={900}
      // onOk={this.handleOk}
      onCancel={() => setVisibility(false)}
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
};

export default injectIntl(GedsUpdateModalView);
