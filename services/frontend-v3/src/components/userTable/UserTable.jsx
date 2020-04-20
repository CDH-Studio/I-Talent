import React, { useState, useEffect } from "react";
import UserTableView from "./UserTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

function UserTable(props) {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [size] = useState("large");

  const { type } = props;

  const getUserInformation = async () => {
    try {
      let results = await axios.get(backendAddress + "api/admin/user");

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Profile Status Change:
  const handleApply = async () => {
    try {
      const url = backendAddress + "api/admin/profileStatus";

      await axios.put(url, statuses);

      setStatuses({});
      setReset(true);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const getDisplayType = (plural) => {
    if (plural)
      return props.intl.formatMessage({
        id: "admin." + type + ".plural",
        defaultMessage: type,
      });

    return props.intl.formatMessage({
      id: "admin." + type + ".singular",
      defaultMessage: type,
    });
  };

  // Column Search Function(s):
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleDropdownChange = (status, id) => {
    let addStatus = statuses;

    addStatus[id] = status;

    setStatuses(addStatus);
  };

  const profileStatusValue = (inactive, flagged) => {
    if (inactive)
      return props.intl.formatMessage({
        id: "admin.inactive",
        defaultMessage: "Inactive",
      });
    else if (flagged)
      return props.intl.formatMessage({
        id: "admin.flagged",
        defaultMessage: "Hidden",
      });
    else
      return props.intl.formatMessage({
        id: "admin.active",
        defaultMessage: "Active",
      });
  };

  const convertToViewableInformation = () => {
    let convertData = _.sortBy(data, "user.name");

    for (let i = 0; i < convertData.length; i++) {
      convertData[i].key = convertData[i].id;
    }

    convertData.forEach((e) => {
      e.fullName = e.user.name;
      e.formatCreatedAt = moment(e.createdAt).format("LLL");
      e.profileLink = "/secured/profile/" + e.id;
      if (e.tenure === null) {
        e.tenureDescriptionEn = "None Specified";
        e.tenureDescriptionFr = "Aucun spécifié";
      } else {
        e.tenureDescriptionEn = e.tenure.descriptionEn;
        e.tenureDescriptionFr = e.tenure.descriptionFr;
      }
      if (e.jobTitleEn === null && e.jobTitleFr === null) {
        e.jobTitleEn = "None Specified";
        e.jobTitleFr = "Aucun spécifié";
      }
    });

    return convertData;
  };

  useEffect(() => {
    let users = [];
    if (loading) {
      const setState = async () => {
        users = await getUserInformation();
        setData(users);
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        users = await getUserInformation();
        setData(users);
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

  document.title = getDisplayType(true) + " - Admin | I-Talent";

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <UserTableView
      data={convertToViewableInformation()}
      size={size}
      searchText={searchText}
      searchedColumn={searchedColumn}
      handleApply={handleApply}
      handleDropdownChange={handleDropdownChange}
      profileStatusValue={profileStatusValue}
      handleSearch={handleSearch}
      handleReset={handleReset}
    />
  );
}

export default injectIntl(UserTable);
