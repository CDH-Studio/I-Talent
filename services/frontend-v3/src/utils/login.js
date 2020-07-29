import { setUser, setUserIsAdmin } from "../redux/slices/userSlice";
import { setLocale } from "../redux/slices/settingsSlice";
import store from "../redux";

const createUser = async (userInfo, axios) =>
  axios.post(`api/user/${userInfo.sub}`, {
    email: userInfo.email,
    name: userInfo.name,
    lastName: userInfo.family_name,
    firstName: userInfo.given_name,
  });

const profileExist = async (userInfo, axios) => {
  let response;
  try {
    response = await axios.get(`api/user/${userInfo.sub}`);

    if (response.data === null) {
      response = await createUser(userInfo, axios);
    }
  } catch (error) {
    response = await createUser(userInfo, axios);
  }

  store.dispatch(
    setUser({
      id: response.data.id,
      avatarColor: response.data.avatarColor,
      initials: response.data.nameInitials,
      name: userInfo.name,
      email: userInfo.email,
    })
  );

  store.dispatch(
    setLocale(
      response.data.preferredLanguage
        ? response.data.preferredLanguage
        : "ENGLISH"
    )
  );

  return response.data.signupStep;
};

const login = async (keycloak, axios) => {
  store.dispatch(
    setUserIsAdmin(keycloak.hasResourceRole("view-admin-console"))
  );

  const userInfo = await keycloak.loadUserInfo();

  return profileExist(userInfo, axios);
};

export default login;
