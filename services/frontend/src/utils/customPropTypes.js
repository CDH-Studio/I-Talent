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
  getFieldValue: PropTypes.func,
  getFieldsValue: PropTypes.func,
  getFieldError: PropTypes.func,
  getFieldsError: PropTypes.func,
  isFieldTouched: PropTypes.func,
  isFieldValidating: PropTypes.func,
  resetFields: PropTypes.func,
  scrollToField: PropTypes.func,
  setFields: PropTypes.func,
  setFieldsValue: PropTypes.func,
  submit: PropTypes.func,
  validateFields: PropTypes.func,
});

const IntlPropType = PropTypes.shape({
  defaultLocale: PropTypes.string,
  formatDate: PropTypes.func,
  formatDateToParts: PropTypes.func,
  formatDisplayName: PropTypes.func,
  formatHTMLMessage: PropTypes.func,
  formatList: PropTypes.func,
  formatMessage: PropTypes.func,
  formatNumber: PropTypes.func,
  formatNumberToParts: PropTypes.func,
  formatPlural: PropTypes.func,
  formatRelativeTime: PropTypes.func,
  formatTime: PropTypes.func,
  formatTimeToParts: PropTypes.func,
  locale: PropTypes.string,
  onError: PropTypes.func,
  textComponent: PropTypes.symbol,
});

const ProfileInfoPropType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  nameInitials: PropTypes.string,
  avatarColor: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  gcconnex: PropTypes.string,
  email: PropTypes.string,
  jobTitle: PropTypes.string,
  branch: PropTypes.string,
  manager: PropTypes.string,
  telephone: PropTypes.string,
  cellphone: PropTypes.string,
  officeLocation: PropTypes.shape({
    streetNumber: PropTypes.number,
    streetName: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
  }),
  teams: PropTypes.arrayOf(PropTypes.string),
});

const FieldPropType = PropTypes.shape({
  field: PropTypes.number,
  key: PropTypes.number,
  fieldKey: PropTypes.number,
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
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
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
  IntlPropType,
  KeyTextOptionsPropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  StylesPropType,
  KeyNameOptionsPropType,
};
