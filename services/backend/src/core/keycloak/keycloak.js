const axios = require("axios");
const qs = require("querystring");
const config = require("../../config");
const { handleAxiosErrors } = require("../../utils/handleErrors");

const getAccessToken = async () => {
  try {
    const data = qs.stringify({
      grant_type: "client_credentials",
      client_secret: config.KEYCLOAK_SECRET,
      client_id: "upskill-api",
    });

    const response = await axios({
      method: "post",
      baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
      url: "/realms/individual/protocol/openid-connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
      timeout: 2000,
    });

    return response.data.access_token;
  } catch (error) {
    handleAxiosErrors(error);
  }
};

const getGroupIds = async (accessToken) => {
  try {
    const groups = await axios({
      method: "get",
      baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
      url: "/admin/realms/individual/groups?search=upskill",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 2000,
    });

    const groupIds = groups.data[0].subGroups.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });

    return groupIds;
  } catch (error) {
    handleAxiosErrors(error);
  }
};

const filterName = (name) => {
  if (name.includes("admin")) {
    return "admin";
  }

  if (name.includes("manager")) {
    return "manager";
  }

  return name;
};

const getMembers = async (accessToken, id, name) => {
  try {
    const members = await axios({
      method: "get",
      baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
      url: `/admin/realms/individual/groups/${id}/members`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 2000,
    });

    return {
      name: filterName(name),
      ids: members.data.map((member) => member.id),
    };
  } catch (error) {
    handleAxiosErrors(error);
  }
};

const getUsers = async (request, response) => {
  try {
    const accessToken = await getAccessToken();
    const groupIds = await getGroupIds(accessToken);

    const data = await Promise.all(
      groupIds.map(async ({ id, name }) => getMembers(accessToken, id, name))
    );

    const cleanedData = {};
    data.forEach(({ name, ids }) => {
      cleanedData[name] = ids;
    });

    response.status(200).send(cleanedData);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
};

module.exports = {
  getUsers,
};
