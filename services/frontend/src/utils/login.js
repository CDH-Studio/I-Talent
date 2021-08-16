import store from "../redux";
import { setLocale } from "../redux/slices/settingsSlice";
import { setUser, setUserIsAdmin } from "../redux/slices/userSlice";

const createUser = async (userInfo, axios) =>
  axios.post("api/user", {
    email: userInfo.email,
    name: userInfo.name,
    lastName: userInfo.family_name,
    firstName: userInfo.given_name,
  });

const profileExist = async (userInfo, axios) => {
  let response;
  try {
    response = await axios.get("api/user");

    if (response.data === null) {
      response = await createUser(userInfo, axios);
    }
  } catch (error) {
    response = await createUser(userInfo, axios);
  }

  const {
    id,
    avatarColor,
    nameInitials: initials,
    firstName,
    lastName,
    preferredLanguage,
    email,
    status,
    signupStep,
  } = response.data;

  await store.dispatch(
    setUser({
      id,
      avatarColor,
      initials,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      name: `${firstName} ${lastName}`,
      email,
      status,
      signupStep,
    })
  );

  store.dispatch(setLocale(preferredLanguage || "ENGLISH"));
};

const login = async (keycloak, axios) => {
  const userInfo = await keycloak.loadUserInfo();
  await profileExist(userInfo, axios);
  store.dispatch(
    setUserIsAdmin(keycloak.hasResourceRole("view-admin-console"))
  );
};

export default login;
