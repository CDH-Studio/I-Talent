import PropTypes from "prop-types";

const ValueTitleOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })
);

const ProfileInfoPropType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  nameInitials: PropTypes.string,
  avatarColor: PropTypes.string,
  linkedinUrl: PropTypes.string,
  githubUrl: PropTypes.string,
  gcconnexUrl: PropTypes.string,
  email: PropTypes.string,
  jobTitle: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }),
  branch: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }),
  manager: PropTypes.string,
  telephone: PropTypes.string,
  cellphone: PropTypes.string,
  location: PropTypes.any,
});

export { ValueTitleOptionsPropType, ProfileInfoPropType };
