const Models = require("../../models");

const User = Models.user;
const Location = Models.location;
const getGedsProfile = require("./util/getGedsProfile");

const getGedsAssist = async (request, response) => {
  id = request.params.id;
  user = await User.findOne({ where: { id } }).then(async (user) => {
    user = user.dataValues;

    let { name } = user;

    const lastSpaceIndex = name.lastIndexOf(" ");
    name = `${name.substring(lastSpaceIndex)}, ${name.substring(
      0,
      lastSpaceIndex
    )}`;

    const gedsData = await getGedsProfile(name);

    const promise = gedsData.map(async (gedsProfile) => {
      const profile = {};

      profile.firstName = gedsProfile.givenName;
      profile.lastName = gedsProfile.surname;
      profile.jobTitle = {
        en: gedsProfile.title.en,
        fr: gedsProfile.title.fr,
      };
      profile.telephone = gedsProfile.phoneNumber;
      profile.cellphone = gedsProfile.altPhoneNumber;

      const organizations = gedsProfile.organizations.map(
        ({ organization }, i) => {
          return { description: organization.description, tier: i };
        }
      );

      const branchOrg = organizations[Math.min(2, organizations.length - 1)];

      profile.branchEn = branchOrg.description.en;
      profile.branchFr = branchOrg.description.fr;

      profile.organizations = organizations;

      const location = await Location.findOne({
        where: {
          postalCode:
            gedsProfile.organizations[gedsProfile.organizations.length - 1]
              .organization.addressInformation.pc,
        },
      }).then((res) => {
        if (res) return res.dataValues;
        return {};
      });

      profile.location = {
        id: location.id,
        description: {
          en: `${location.addressEn}, ${location.city}, ${location.provinceEn}`,
          fr: `${location.addressFr}, ${location.city}, ${location.provinceFr}`,
        },
      };

      profile.email = user.email;

      return profile;
    });
    const profiles = await Promise.all(promise);
    response.status(200).send(profiles);
  });
};

module.exports = {
  getGedsAssist,
};
