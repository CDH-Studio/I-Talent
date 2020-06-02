import { post } from "axios";

import store from "../redux";
import config from "../config";
import {
  setUserId,
  setUserAvatarColor,
  setUserInitials,
} from "../redux/slices/userSlice";

const createUser = (email, name) => {
  return post(`${config.backendAddress}api/user/`, {
    email,
    name,
  })
    .then((res) => {
      store.dispatch(setUserId(res.data.user.id));
      store.dispatch(setUserAvatarColor(res.data.user.avatarColor));
      store.dispatch(setUserInitials(res.data.user.nameInitials));
      return { res, hasProfile: res.data.hasProfile };
    })
    .catch((err) => {
      throw err;
    });
};

export default createUser;
