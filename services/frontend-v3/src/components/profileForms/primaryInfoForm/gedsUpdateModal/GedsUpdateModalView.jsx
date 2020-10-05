import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spin, Table, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { isEqual, identity, pickBy, find } from "lodash";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isMobilePhone } from "validator";
import { Prompt } from "react-router";
import useAxios from "../../../../utils/axios-instance";

const GedsUpdateModalView = ({ visibility, profile }) => {
  const axios = useAxios();

  const [newGedsValues, setNewGedsValues] = useState(null);
  const [gedsModalVisible, setGedsModalVisible] = useState(false);
  const [savedProfile, setSavedProfile] = useState(profile);
  const [tableData, setTableData] = useState(null);
  const [syncNeeded, setSyncNeeded] = useState(true);

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
    //let updatedProfile = savedProfile;
    let updatedProfile = { ...savedProfile };

    delete updatedProfile.jobTitle;
    updatedProfile.jobTitle = savedProfile.jobTitle;
    updatedProfile.jobTitle = {
      [locale]: savedProfile.jobTitle,
    };

    delete updatedProfile.branch;
    updatedProfile.branch = {
      [locale]: savedProfile.branch,
    };

    updatedProfile.branch = savedProfile.organization;

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
    //await axios.put(`api/profile/${userId}?language=ENGLISH`, updatedProfile);
    saveDataToDB(updatedProfile);
    setSyncNeeded(true);
    // console.log(e.target.value);
  };

  /** **********************************
   ********* Render Component *********
   *********************************** */
  const getData = () => {
    console.log(newGedsValues);
    console.log(
      newGedsValues
        ? newGedsValues.organizations[0][
            newGedsValues.organizations[0].length - 1
          ].title.ENGLISH
        : "-"
    );
    return [
      {
        key: "1",
        rowName: "First Name",
        saved: savedProfile.firstName,
        geds: newGedsValues ? newGedsValues.firstName : "-",
        paramName: "firstName",
      },
      {
        key: "2",
        rowName: "Last Name",
        saved: savedProfile.lastName,
        geds: newGedsValues ? newGedsValues.lastName : "-",
        paramName: "lastName",
      },
      {
        key: "3",
        rowName: "Job Title",
        saved: savedProfile.jobTitle,
        geds: newGedsValues ? newGedsValues.jobTitle.ENGLISH : "-",
        paramName: "jobTitle",
      },
      {
        key: "4",
        rowName: "Branch",
        saved: savedProfile.branch,
        geds: newGedsValues ? newGedsValues.branch.ENGLISH : "-",
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
        geds: newGedsValues
          ? newGedsValues.organizations[0][
              newGedsValues.organizations[0].length - 1
            ].title.ENGLISH
          : "-",
        paramName: "organization",
      },
    ];
  };
  // const data = [
  //   {
  //     key: "1",
  //     rowName: "First Name",
  //     saved: savedProfile.firstName,
  //     geds: newGedsValues ? newGedsValues.firstName : "-",
  //     paramName: "firstName",
  //   },
  //   {
  //     key: "2",
  //     rowName: "Last Name",
  //     saved: savedProfile.lastName,
  //     geds: newGedsValues ? newGedsValues.lastName : "-",
  //     paramName: "lastName",
  //   },
  //   {
  //     key: "3",
  //     rowName: "Job Title",
  //     saved: savedProfile.jobTitle,
  //     geds: newGedsValues ? newGedsValues.jobTitle.ENGLISH : "-",
  //     paramName: "jobTitle",
  //   },
  //   {
  //     key: "4",
  //     rowName: "Branch",
  //     saved: savedProfile.branch,
  //     geds: newGedsValues ? newGedsValues.branch.ENGLISH : "-",
  //     paramName: "branch",
  //   },
  //   {
  //     key: "5",
  //     rowName: "Organization",
  //     saved: savedProfile.organizations[0]
  //       ? savedProfile.organizations[0][
  //           savedProfile.organizations[0].length - 1
  //         ].title
  //       : "-",
  //     geds: newGedsValues
  //       ? newGedsValues.organizations[0][
  //           newGedsValues.organizations[0].length - 1
  //         ].title.ENGLISH
  //       : "-",
  //     paramName: "organization",
  //   },
  // ];

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
          icon={<SyncOutlined />}
          onClick={() => syncGedsButtonAction({ paramName: record.paramName })}
        >
          Sync
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
      setSavedProfile(result.data);
      console.log("ali");
      console.log(savedProfile);
    }
  };

  const getGedsInfo = async () => {
    await axios
      .get(`api/profGen/${id}`, {
        params: {
          name,
        },
      })
      .then((result) => {
        console.log(result.data);
        setNewGedsValues(result.data);
      })
      .catch((error) => {
        //  throw error;
        // openNotificationWithIcon({
        //   type: "warning",
        //   description: intl.formatMessage({
        //     id: "profile.geds.failed.to.retrieve",
        //   }),
        // });
        throw error;
      });
  };

  useEffect(() => {
    if (syncNeeded & visibility) {
      console.log("in here2");
      getProfileInfo().then((value) => {
        getGedsInfo().then((value) => {
          // console.log(
          //   newGedsValues.organizations[0][
          //     newGedsValues.organizations[0].length - 1
          //   ].title.ENGLISH
          // );
          setTableData(getData());
        });
      });

      setSyncNeeded(false);
    }
  }, [syncNeeded, visibility]);

  useEffect(() => {
    setTableData(getData());
    console.log(getData());
    console.log(newGedsValues);
    console.log(savedProfile);
    console.log(tableData);
  }, [newGedsValues, savedProfile]);

  //   // Get user profile for form drop down
  //   const getProfileInfo = useCallback(async () => {
  //     if (id) {
  //       const result = await axios.get(
  //         `api/profile/private/${id}?language=${locale}`
  //       );
  //       setSavedProfile(result.data);
  //     }
  //   }, [axios, id, locale]);
  console.log(syncNeeded);
  return (
    <Modal
      title="GC Directory Sync"
      visible={visibility}
      width={900}
      // onOk={this.handleOk}
      // onCancel={this.handleCancel}
    >
      {!newGedsValues && (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}
      <p>{syncNeeded}</p>
      {newGedsValues && (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          size="small"
        />
      )}
    </Modal>
  );
};

GedsUpdateModalView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default injectIntl(GedsUpdateModalView);
