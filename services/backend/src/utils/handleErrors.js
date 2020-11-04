/**
 * Pretty prints the relevant information from an axios error
 *
 * @param {*} error Axios error from a try/catch
 */
const handleAxiosErrors = (error) => {
  if (error.response) {
    const { status, statusText, data, config, headers } = error.response;

    console.log(status, statusText, data);
    console.log("Config", config);
    console.log("Headers", headers);
  }
};

module.exports = { handleAxiosErrors };
