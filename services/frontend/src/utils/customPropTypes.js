import PropTypes from "prop-types";

const KeyTitleOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  })
);

const KeyNameOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })
);

const KeyTextOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
  })
);

const IdDescriptionPropType = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.shape({
      en: PropTypes.string,
      fr: PropTypes.string,
    }),
    id: PropTypes.string,
  })
);

const FormInstancePropType = PropTypes.shape({
  getFieldError: PropTypes.func,
  getFieldValue: PropTypes.func,
  getFieldsError: PropTypes.func,
  getFieldsValue: PropTypes.func,
  isFieldTouched: PropTypes.func,
  isFieldValidating: PropTypes.func,
  resetFields: PropTypes.func,
  scrollToField: PropTypes.func,
  setFields: PropTypes.func,
  setFieldsValue: PropTypes.func,
  submit: PropTypes.func,
  validateFields: PropTypes.func,
});

const ProfileInfoPropType = PropTypes.shape({
  avatarColor: PropTypes.string,
  branch: PropTypes.string,
  cellphone: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  gcconnex: PropTypes.string,
  github: PropTypes.string,
  jobTitle: PropTypes.string,
  lastName: PropTypes.string,
  linkedin: PropTypes.string,
  manager: PropTypes.string,
  nameInitials: PropTypes.string,
  officeLocation: PropTypes.shape({
    city: PropTypes.string,
    province: PropTypes.string,
    streetName: PropTypes.string,
    streetNumber: PropTypes.number,
  }),
  teams: PropTypes.arrayOf(PropTypes.string),
  telephone: PropTypes.string,
});

const FieldPropType = PropTypes.shape({
  field: PropTypes.number,
  fieldKey: PropTypes.number,
  key: PropTypes.number,
});

const HistoryPropType = PropTypes.shape({
  action: PropTypes.string,
  block: PropTypes.func,
  createHref: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  push: PropTypes.func,
  replace: PropTypes.func,
});

const StylesPropType = PropTypes.objectOf(PropTypes.objectOf(PropTypes.string));

export {
  FieldPropType,
  FormInstancePropType,
  HistoryPropType,
  IdDescriptionPropType,
  KeyNameOptionsPropType,
  KeyTextOptionsPropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  StylesPropType,
};
