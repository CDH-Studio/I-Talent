import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { Prompt, useHistory } from "react-router";
import useAxios from "../../../utils/useAxios";
import UserTableView from "./UserTableView";
import handleError from "../../../functions/handleError";
import {
  setAdminUsers,
  setAdminUsersLoading,
} from "../../../redux/slices/adminSlice";

/**
 *  UserTable(props)
 *  Controller for the UserTableView.
 *  It gathers the required data for rendering the component.
 */
const UserTable = () => {
  const [statuses, setStatuses] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [modifiedStatus, setModifiedStatus] = useState(false);
  const axios = useAxios();
  const intl = useIntl();
  const history = useHistory();

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // Fetches the user information
  const getUserInformation = useCallback(async () => {
    try {
      dispatch(setAdminUsers({ data: [] }));
      dispatch(setAdminUsersLoading(true));

      const results = await Promise.all([
        axios.get(`admin/users?language=${locale}`),
        axios.get(`keycloak/users?language=${locale}`),
      ]);

      // Formats data from backend into viewable data for the table
      const formattedData = results[0].data.map((user) => ({
        key: user.id,
        profileLink: `/profile/${user.id}`,
        fullName: `${user.firstName} ${user.lastName}`,
        jobTitle: user.jobTitle || intl.formatMessage({ id: "none.specified" }),
        tenure: user.tenure || intl.formatMessage({ id: "none.specified" }),
        formatCreatedAt: dayjs(user.createdAt).format("YYYY-MM-DD"),
        formatUpdatedAt: dayjs(user.updatedAt).format("YYYY-MM-DD"),
        status: user.status,
        isAdmin: results[1].data.admin.includes(user.id),
        isManager: results[1].data.manager.includes(user.id),
      }));

      dispatch(setAdminUsers({ data: formattedData, locale }));
    } catch (error) {
      handleError(error, "redirect", history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, dispatch, locale]);

  useEffect(() => {
    getUserInformation();
  }, [getUserInformation]);

  // Handles profile status change
  const handleApply = async () => {
    const url = `admin/userStatuses`;

    await axios.put(url, statuses);

    setStatuses({});
    setModifiedStatus(false);
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

    if (status) {
      addStatus[id] = status;
    } else {
      delete addStatus[id];
    }

    setModifiedStatus(Object.keys(addStatus).length > 0);

    setStatuses(addStatus);
  };

  // Gets user's profile status value to display in dropdown
  const profileStatusValue = (status) => {
    switch (status) {
      case "INACTIVE":
        return intl.formatMessage({
          id: "inactive",
        });

      case "HIDDEN":
        return intl.formatMessage({
          id: "flagged",
        });

      default:
        return intl.formatMessage({
          id: "active",
        });
    }
  };

  // Handles the deletion of a user
  const handleSubmitDelete = async (id) => {
    await axios.delete(`user/${id}`);

    getUserInformation();
  };

  useEffect(() => {
    // Gets part of the title for the page
    const getDisplayType = (plural) => {
      if (plural)
        return intl.formatMessage({
          id: `users`,
        });

      return intl.formatMessage({
        id: `user`,
      });
    };

    document.title = `${getDisplayType(true)} - Admin | I-Talent`;
  }, [intl]);

  return (
    <>
      <Prompt
        when={modifiedStatus}
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
      />
      <UserTableView
        searchText={searchText}
        searchedColumn={searchedColumn}
        handleApply={handleApply}
        handleDropdownChange={handleDropdownChange}
        profileStatusValue={profileStatusValue}
        handleSearch={handleSearch}
        handleReset={handleReset}
        modifiedStatus={modifiedStatus}
        handleSubmitDelete={handleSubmitDelete}
      />
    </>
  );
};

export default UserTable;
