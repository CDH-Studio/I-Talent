import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { IntlPropType } from "../../../customPropTypes";
import UserTableView from "./UserTableView";
import config from "../../../config";
import handleError from "../../../functions/handleError";
import {
  setAdminUsers,
  setAdminUsersLoading,
} from "../../../redux/slices/adminSlice";

const { backendAddress } = config;

/**
 *  UserTable(props)
 *  Controller for the UserTableView.
 *  It gathers the required data for rendering the component.
 */
function UserTable({ intl }) {
  const [statuses, setStatuses] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const size = "large";

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // Fetches the user information
  const getUserInformation = useCallback(async () => {
    try {
      dispatch(setAdminUsers({ data: [] }));
      dispatch(setAdminUsersLoading(true));

      const results = await axios.get(
        `${backendAddress}api/admin/users?language=${
          locale === "en" ? "ENGLISH" : "FRENCH"
        }`
      );

      // Formats data from backend into viewable data for the table
      const formattedData = results.data.map((user) => ({
        key: user.id,
        profileLink: `/secured/profile/${user.id}`,
        fullName: `${user.firstName} ${user.lastName}`,
        jobTitle: user.jobTitle || intl.formatMessage({ id: "admin.none" }),
        tenure: user.tenure || intl.formatMessage({ id: "admin.none" }),
        formatCreatedAt: moment(user.createdAt).format("LLL"),
        status: user.status,
      }));

      dispatch(setAdminUsers({ data: formattedData, locale }));
    } catch (error) {
      handleError(error, "redirect");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, locale]);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  // Handles profile status change
  const handleApply = async () => {
    const url = `${backendAddress}api/admin/userStatuses`;

    await axios.put(url, statuses);

    setStatuses({});
    getUserInformation();
  };

  // Handles the search part of the column search functionality
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Handles reset of column search functionality
  // Consult: function taken from Ant Design table components (updated to functional)
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Handles dropdown option change
  // Takes note of change in statuses through id, so it can update user(s) when "Apply" is hit.
  const handleDropdownChange = (status, id) => {
    const addStatus = statuses;

    addStatus[id] = status;

    setStatuses(addStatus);
  };

  // Gets user's profile status value to display in dropdown
  const profileStatusValue = (status) => {
    switch (status) {
      case "INACTIVE":
        return intl.formatMessage({
          id: "admin.inactive",
        });

      case "HIDDEN":
        return intl.formatMessage({
          id: "admin.flagged",
        });

      default:
        return intl.formatMessage({
          id: "admin.active",
        });
    }
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `admin.user.plural`,
        });

      return intl.formatMessage({
        id: `admin.user.singular`,
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <UserTableView
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
};

UserTable.defaultProps = {
  intl: undefined,
};

export default injectIntl(UserTable);
