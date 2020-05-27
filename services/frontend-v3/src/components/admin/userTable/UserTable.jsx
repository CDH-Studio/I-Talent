/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { injectIntl } from "react-intl";
import { IntlPropType } from "../../../customPropTypes";
import UserTableView from "./UserTableView";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;

/**
 *  UserTable(props)
 *  Controller for the UserTableView.
 *  It gathers the required data for rendering the component.
 */
function UserTable({ intl, type }) {
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const size = "large";

  /* get user information */
  const getUserInformation = async () => {
    try {
      const results = await axios.get(`${backendAddress}api/admin/user`);

      return results.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  };

  /* useEffect will run if statement, when the component is mounted */
  /* useEffect will run else statement, if profile status changes */
  useEffect(() => {
    if (loading) {
      const setState = async () => {
        await getUserInformation()
          .then(users => setData(users))
          .catch(error => handleError(error, "redirect"));
        setLoading(false);
      };
      setState();
    } else {
      const updateState = async () => {
        await getUserInformation()
          .then(users => setData(users))
          .catch(error => handleError(error, "redirect"));
        setReset(false);
      };
      updateState();
    }
  }, [loading, reset]);

  /* handles profile status change */
  const handleApply = async () => {
    try {
      const url = `${backendAddress}api/admin/profileStatus`;

      await axios.put(url, statuses);

      setStatuses({});
      setReset(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  };

  /* get part of the title for the page */
  const getDisplayType = plural => {
    if (plural)
      return intl.formatMessage({
        id: `admin.${type}.plural`,
        defaultMessage: type,
      });

    return intl.formatMessage({
      id: `admin.${type}.singular`,
      defaultMessage: type,
    });
  };

  /* handles the search part of the column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  /* handles reset of column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  /* handles dropdown option change */
  // Takes note of change in statuses through id, so it can update user(s) when "Apply" is hit.
  const handleDropdownChange = (status, id) => {
    const addStatus = statuses;

    addStatus[id] = status;

    setStatuses(addStatus);
  };

  /* gets user's profile status value to display in dropdown */
  const profileStatusValue = (inactive, flagged) => {
    if (inactive)
      return intl.formatMessage({
        id: "admin.inactive",
        defaultMessage: "Inactive",
      });
    if (flagged)
      return intl.formatMessage({
        id: "admin.flagged",
        defaultMessage: "Hidden",
      });
    return intl.formatMessage({
      id: "admin.active",
      defaultMessage: "Active",
    });
  };

  /* configures data from backend into viewable data for the table */
  const convertToViewableInformation = () => {
    const convertData = _.sortBy(data, "user.name");

    for (let i = 0; i < convertData.length; i += 1) {
      convertData[i].key = convertData[i].id;
    }

    convertData.forEach(e => {
      e.fullName = e.user.name;
      e.formatCreatedAt = moment(e.createdAt).format("LLL");
      e.profileLink = `/secured/profile/${e.id}`;
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

  document.title = `${getDisplayType(true)} - Admin | I-Talent`;

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

UserTable.propTypes = {
  intl: IntlPropType,
  type: PropTypes.string.isRequired,
};

UserTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(UserTable);
