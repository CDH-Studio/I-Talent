import store from "../redux";
import { setLocale } from "../redux/slices/settingsSlice";
import { setUser, setUserIsAdmin } from "../redux/slices/userSlice";

const createUser = async (userInfo, axios) =>
  axios.post("user", {
    email: userInfo.email,
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
    name: userInfo.name,
  });

const profileExist = async (userInfo, axios) => {
  let response;
  try {
    response = await axios.get("user");

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
      avatarColor,
      email,
      firstName: `${firstName}`,
      id,
      initials,
      lastName: `${lastName}`,
      name: `${firstName} ${lastName}`,
      signupStep,
      status,
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
