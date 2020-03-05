export default {
  backendAddressLoc: "http://localhost:8080/",
  backendAddressDev:
    "http://upskill-backend-upskill.apps.dev.openshift.ised-isde.canada.ca/",
  backendAddressUat:
    "http://upskill-backend-uat-upskill.apps.dev.openshift.ised-isde.canada.ca/",
  backendAddress: process.env.REACT_APP_API_ADDRESS
};
