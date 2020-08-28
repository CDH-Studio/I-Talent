import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SettingsLayoutView from "./SettingsLayoutView";
import useAxios from "../../../utils/axios-instance";
import handleError from "../../../functions/handleError";
import { setUserStatus } from "../../../redux/slices/userSlice";

const SettingsLayout = () => {
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, status } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  const deleteCurrentUser = async () => {
    try {
      await axios.delete(`/api/user/${id}`);
      history.push("/logout");
    } catch (error) {
      handleError(error, "message");
    }
  };

  const setProfileVisibility = async (visibility) => {
    try {
      const updatedState = visibility ? "ACTIVE" : "HIDDEN";
      await axios.put(`/api/profile/${id}?language=${locale}`, {
        status: updatedState,
      });

      dispatch(setUserStatus(updatedState));
    } catch (error) {
      handleError(error, "message");
    }
  };

  return (
    <SettingsLayoutView
      deleteCurrentUser={deleteCurrentUser}
      setProfileVisibility={setProfileVisibility}
      profileStatus={status}
    />
  );
};

export default SettingsLayout;
