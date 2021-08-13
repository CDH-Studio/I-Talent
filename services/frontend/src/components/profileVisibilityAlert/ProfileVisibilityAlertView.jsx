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
      message={
        <FormattedMessage
          id={messageId}
          values={{
            b: (chunks) => <strong>{chunks}</strong>,
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
