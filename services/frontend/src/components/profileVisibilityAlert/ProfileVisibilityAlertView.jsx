import PropTypes from "prop-types";
import { Alert } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import config from "../../utils/runtimeConfig";

const { drupalSite } = config;

const ProfileVisibilityAlertView = ({
  canViewHiddenProfiles,
  isUsersProfile,
  isProfileHidden,
  isProfileInactive,
}) => {
  let messageText;
  const locale = useSelector((state) => state.settings.locale);

  // Message to show when user is looking at their own profile
  if (isUsersProfile) {
    if (isProfileInactive) {
      messageText = "inactive.message";
    } else if (isProfileHidden) {
      messageText = "hidden.profile.message";
    }
  }

  // messages to show if an admin is looking at another user's profile
  if (canViewHiddenProfiles) {
    if (isProfileInactive) {
      messageText = "inactive.message.other";
    } else if (isProfileHidden) {
      messageText = "hidden.profile.message.other";
    }
  }

  return messageText ? (
    <Alert
      message={
        <FormattedMessage
          id={messageText}
          values={{
            b: (chunks) => <b>{chunks}</b>,
            helpUrl: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${drupalSite}${locale === "ENGLISH" ? "en" : "fr"}help`}
              >
                <FormattedMessage id="footer.contact.link" />
              </a>
            ),
          }}
        />
      }
      type={isProfileHidden ? "warning" : "error"}
      showIcon
      className="mb-2"
      icon={isProfileHidden ? <EyeInvisibleOutlined /> : <LockOutlined />}
    />
  ) : null;
};

ProfileVisibilityAlertView.propTypes = {
  canViewHiddenProfiles: PropTypes.bool.isRequired,
  isUsersProfile: PropTypes.bool.isRequired,
  isProfileHidden: PropTypes.bool.isRequired,
  isProfileInactive: PropTypes.bool.isRequired,
};

export default ProfileVisibilityAlertView;
