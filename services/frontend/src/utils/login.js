import { setUser, setUserIsAdmin } from "../redux/slices/userSlice";
import { setLocale } from "../redux/slices/settingsSlice";
import store from "../redux";

const createUser = async (userInfo, axios) =>
  axios.post("api/profile", {
    email: userInfo.email,
    name: userInfo.name,
    lastName: userInfo.family_name,
    firstName: userInfo.given_name,
  });

const profileExist = async (userInfo, axios) => {
  const { locale } = store.getState().settings;

  let response;
  try {
    response = await axios.get(
      `api/profile/${userInfo.sub}?language=${locale}`
    );

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

  store.dispatch(
    setUser({
      id,
      avatarColor,
      initials,
      name: `${firstName} ${lastName}`,
      email,
      status,
      signupStep,
    })
  );

  store.dispatch(setLocale(preferredLanguage || "ENGLISH"));
};

const login = async (keycloak, axios) => {
  store.dispatch(
    setUserIsAdmin(keycloak.hasResourceRole("view-admin-console"))
  );

  const userInfo = await keycloak.loadUserInfo();

  await profileExist(userInfo, axios);
};

export default login;
