// Import the mock library
const SequelizeMock = require("sequelize-mock");

// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();

// Define mock User Model
const UserMock = DBConnectionMock.define("user");

// Define mock Profile Model
const ProfileMock = DBConnectionMock.define("profile");

// const test_getUserInfoById = () => {
//   const run = UserMock.$queueResult([
//     UserMock.build({
//       id: "012345",
//       name: "John Doe",
//       email: "john.doe@canada.ca",
//       inactive: false
//     }),
//     UserMock.build({
//       id: "054321",
//       name: "Clarence Decatur Howe",
//       email: "clarencedecatur.howe@canada.ca",
//       inactive: false
//     })
//   ]);
//   return run;
// };

// Note: keep in-order of data entry

// // // user.post: createUser Test (Fix)
// UserMock.$queueResult(
//   UserMock.build({
//     id: "054321",
//     name: "Clarence Decatur Howe",
//     email: "clarencedecatur.howe@canada.ca",
//     inactive: false
//   })
// );

// user.get:

// getUserById Test
UserMock.$queueResult([
	UserMock.build({
		id: "012345",
		name: "John Doe",
		email: "john.doe@canada.ca",
		inactive: false,
	}),
	UserMock.build({
		id: "054321",
		name: "Clarence Decatur Howe",
		email: "clarencedecatur.howe@canada.ca",
		inactive: false,
	}),
]);

// getAllUserInfo Test
UserMock.$queueResult([
	UserMock.build({
		id: "012345",
		name: "John Doe",
		email: "john.doe@canada.ca",
		inactive: false,
	}),
	UserMock.build({
		id: "054321",
		name: "Clarence Decatur Howe",
		email: "clarencedecatur.howe@canada.ca",
		inactive: false,
	}),
]);

// admin.get:

//  getInactive Test (Fix)
UserMock.$queueResult(
	UserMock.build({
		id: "012345",
		name: "John Doe",
		email: "john.doe@canada.ca",
		inactive: true,
	})
);

// getFlagged Test
ProfileMock.$queueResult(
	ProfileMock.build({
		id: "06789",
		name: "Mary Doe",
		email: "mary.doe@canada.ca",
		flagged: true,
	})
);

// ProfileMock.$queueResult(
//   ProfileMock.build({
//     id: "06789",
//     name: "Mary Doe",
//     email: "mary.doe@canada.ca",
//     flagged: true
//   })
// );

// // ProfileMock.$queueResult([
// //   ProfileMock.build({
// //     id: "012345",
// //     name: "John Doe",
// //     email: "john.doe@canada.ca",
// //     flagged: false
// //   }),
// //   ProfileMock.build({
// //     id: "054321",
// //     name: "Clarence Decatur Howe",
// //     email: "clarencedecatur.howe@canada.ca",
// //     flagged: false
// //   })
// // ]);

// // Associate UserMock to ProfileMock:
// UserMock.belongsTo(ProfileMock, {
//   foreignKey: { fieldName: "id" }
// });

// Allow UserMock to be used outside module:
module.exports = {
	user: UserMock,
	profile: ProfileMock,
};
