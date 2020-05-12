import PropTypes from "prop-types";

const ValueTitleOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })
);

const KeyTitleOptionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
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
  defaultFormats: PropTypes.object,
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
  formats: PropTypes.object,
  formatters: PropTypes.object,
  locale: PropTypes.string,
  messages: PropTypes.object,
  onError: PropTypes.func,
  textComponent: PropTypes.symbol,
  timeZone: PropTypes.any,
});

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
    state: PropTypes.object,
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
  ValueTitleOptionsPropType,
};
