const axios = require("axios");
const qs = require("querystring");
const config = require("../../config");

const getAccessToken = async () => {
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
};

const getGroupIds = async (accessToken) => {
  const groups = await axios({
    method: "get",
    baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
    url: "/admin/realms/individual/groups?search=upskill",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 2000,
  });

  const groupIds = groups.data[0].subGroups.map(({ id, name }) => ({
    id,
    name,
  }));

  return groupIds;
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
};

const getUsers = async (request, response) => {
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
};

module.exports = {
  getUsers,
};
