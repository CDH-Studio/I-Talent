import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import handleError from "../../../functions/handleError";
import { setUserStatus } from "../../../redux/slices/userSlice";
import useAxios from "../../../utils/useAxios";
import SettingsLayoutView from "./SettingsLayoutView";

const SettingsLayout = () => {
  const axios = useAxios();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, status } = useSelector((state) => state.user);
  const { locale } = useSelector((state) => state.settings);

  const deleteCurrentUser = async () => {
    try {
      await axios.delete(`/user/${id}`);
      history.push("/logout");
    } catch (error) {
      handleError(error, "message", history);
    }
  };

  const setProfileVisibility = async (visibility) => {
    try {
      const updatedState = visibility ? "ACTIVE" : "HIDDEN";
      await axios.put(`/profile/${id}?language=${locale}`, {
        status: updatedState,
      });

      dispatch(setUserStatus(updatedState));
    } catch (error) {
      handleError(error, "message", history);
    }
  };

  return (
    <SettingsLayoutView
      deleteCurrentUser={deleteCurrentUser}
      profileStatus={status}
      setProfileVisibility={setProfileVisibility}
    />
  );
};

export default SettingsLayout;
