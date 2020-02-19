// import React, { Component } from "react";
// import Keycloak from "keycloak-js";
// import { Route, Redirect } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import axios from "axios";

// // import animatedLogo from "../assets/animatedLogo.gif";

// import {
//   AdminSkill,
//   AdminCompetency,
//   AdminDiploma,
//   AdminSchool,
//   AdminUser,
//   AdminDasboard
// } from "../../pages/admin";

// import config from "../../config";
// const { backendAddress } = config;

// const history = createBrowserHistory();

// class Secured extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authenticated: false,
//       keycloak: null,
//       isAdmin: false,
//       loading: true
//     };

//     this.changeLanguage = this.props.changeLanguage;
//   }

//   componentDidMount() {
//     const keycloak = Keycloak("/keycloak.json");
//     keycloak
//       .init({ onLoad: "login-required", promiseType: "native" })
//       .then(authenticated => {
//         axios.interceptors.request.use(config =>
//           keycloak.updateToken(300).then(() => {
//             config.headers.Authorization = "Bearer " + keycloak.token;
//             return Promise.resolve(config).catch(keycloak.login);
//           })
//         );

//         axios.get(backendAddress + "api/admin/check").then(
//           () => {
//             this.setState({
//               keycloak: keycloak,
//               authenticated: authenticated,
//               isAdmin: true,
//               loading: false
//             });
//           },
//           () => {
//             this.setState({
//               keycloak: keycloak,
//               authenticated: authenticated,
//               isAdmin: false,
//               loading: false
//             });
//           }
//         );
//       });
//   }

//   goto = link => history.push(link);

//   render() {
//     //If NOT using some version of Internet Explorer
//     if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
//       document.body.style = "background-color: #eeeeee";
//     }
//     // if (!this.state.isAdmin) {
//     //   return (
//     //     <div>
//     //       <Modal open basic style={{ height: "40%" }} size="fullscreen">
//     //         <Grid stretched style={{ height: "100%" }}>
//     //           <Grid.Column textAlign="center">
//     //             <Grid.Row stretched>
//     //               <Header inverted as="h1" style={{ fontSize: "100px" }}>
//     //                 403 Forbidden
//     //               </Header>
//     //             </Grid.Row>

//     //             <Grid.Row stretched>
//     //               <Header inverted as="h4">
//     //                 Looks like someone doesn't belong here
//     //               </Header>
//     //             </Grid.Row>

//     //             <Grid.Row stretched>
//     //               <Button as="a" href="/secured/" color="blue">
//     //                 Go back to Homepage
//     //               </Button>
//     //             </Grid.Row>
//     //           </Grid.Column>
//     //         </Grid>
//     //       </Modal>
//     //     </div>
//     //   );
//     // }

//     const keycloak = this.state.keycloak;
//     if (keycloak) {
//       if (this.state.authenticated) {
//         return (
//           <div>
//             {this.state.redirect}
//             {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                 <div>
//                 {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
//             {/* <div>
//                   <form>
//                     <textarea
//                       ref={textarea => (this.textArea = textarea)}
//                       value={keycloak.token}
//                     />
//                   </form>
//                   {document.queryCommandSupported("copy") && (
//                     <div>
//                       <button onClick={this.copyToClipboard}>Copy</button>
//                       {this.state.copySuccess}
//                     </div>
//                   )}
//                 </div>
//                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

//             {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

//             <Route
//               exact
//               path="/admin/"
//               render={() => <Redirect to="/admin/dashboard" />}
//             />
//             <Route
//               exact
//               path="/admin/dashboard"
//               render={routeProps => (
//                 <AdminDasboard
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path="/admin/skill"
//               render={routeProps => (
//                 <AdminSkill
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path="/admin/competency"
//               render={routeProps => (
//                 <AdminCompetency
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path="/admin/diploma"
//               render={routeProps => (
//                 <AdminDiploma
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path="/admin/school"
//               render={routeProps => (
//                 <AdminSchool
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//             <Route
//               exact
//               path="/admin/user"
//               render={routeProps => (
//                 <AdminUser
//                   keycloak={keycloak}
//                   changeLanguage={this.changeLanguage}
//                   {...routeProps}
//                 />
//               )}
//             />
//           </div>
//         );
//       } else {
//         return <div>Unable to authenticate!</div>;
//       }
//     }
//     return <div></div>;
//   }
//   //Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   copyToClipboard = e => {
//     this.textArea.select();
//     document.execCommand("copy");
//     e.target.focus();
//     this.setState({ copySuccess: "Copied!" });
//   };
//   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// }

// export default Secured;
