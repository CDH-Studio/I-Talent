const handleAxiosErrors = (error) => {
  if (error.response) {
    console.log(
      error.response.status,
      error.response.statusText,
      error.response.data
    );
    console.log("Config", error.response.config);
    console.log("Headers", error.response.headers);
  }
};

module.exports = { handleAxiosErrors };
