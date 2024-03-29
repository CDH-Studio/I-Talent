import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import PropTypes from "prop-types";

import config from "../../utils/runtimeConfig";

const { drupalSite } = config;

const ProfileVisibilityAlertView = ({
  canViewHiddenProfiles,
  isUsersProfile,
  isProfileHidden,
  isProfileInactive,
}) => {
  let messageId;
  const locale = useSelector((state) => state.settings.locale);

  // Message to show when user is looking at their own profile
  if (isUsersProfile) {
    if (isProfileInactive) {
      messageId = "inactive.message";
    } else if (isProfileHidden) {
      messageId = "hidden.profile.message";
    }
  }

  // messages to show if an admin is looking at another user's profile
  if (canViewHiddenProfiles) {
    if (isProfileInactive) {
      messageId = "inactive.message.other";
    } else if (isProfileHidden) {
      messageId = "hidden.profile.message.other";
    }
  }

  return messageId ? (
    <Alert
      className="mb-2"
      icon={isProfileHidden ? <EyeInvisibleOutlined /> : <LockOutlined />}
      message={
        <FormattedMessage
          id={messageId}
          values={{
            b: (chunks) => <strong>{chunks}</strong>,
            helpUrl: (
              <a
                href={`${drupalSite}${locale === "ENGLISH" ? "en" : "fr"}help`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FormattedMessage id="footer.contact.link" />
              </a>
            ),
          }}
        />
      }
      showIcon
      type={isProfileHidden ? "warning" : "error"}
    />
  ) : null;
};

ProfileVisibilityAlertView.propTypes = {
  canViewHiddenProfiles: PropTypes.bool.isRequired,
  isProfileHidden: PropTypes.bool.isRequired,
  isProfileInactive: PropTypes.bool.isRequired,
  isUsersProfile: PropTypes.bool.isRequired,
};

export default ProfileVisibilityAlertView;
