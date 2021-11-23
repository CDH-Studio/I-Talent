import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ErrorProfilePage from "../../errorResult/errorProfilePage";
import Header from "../../header/Header";
import ProfileVisibilityAlert from "../../profileVisibilityAlert/ProfileVisibilityAlert";
import AppLayout from "../appLayout/AppLayout";
import AllProfileCards from "./AllProfileCards/AllProfileCards";
import ProfileSidebarContent from "./ProfileSidebarContent/ProfileSidebarContent";

import "./ProfileLayoutView.less";

const ProfileLayoutView = ({
  data,
  connectionStatus,
  isUsersProfile,
  isLoading,
  savedFormContent,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedFormContent === false) {
      notification.error({
        message: intl.formatMessage({ id: "edit.save.error" }),
      });
    } else if (savedFormContent === true) {
      notification.success({
        message: intl.formatMessage({ id: "edit.save.success" }),
      });
    }

    dispatch(setSavedFormContent(undefined));
  }, [savedFormContent, dispatch, intl]);

  return (
    <AppLayout
      displaySideBar
      loading={isLoading}
      sideBarContent={
        <ProfileSidebarContent isOwnersProfile={isUsersProfile} />
      }
    >
      <ProfileVisibilityAlert
        isProfileHidden={
          data && data.status && ["HIDDEN"].includes(data.status)
        }
        isProfileInactive={
          data && data.status && ["INACTIVE"].includes(data.status)
        }
        isUsersProfile={isUsersProfile}
      />
      <Header
        backBtn
        extra={
          <Button onClick={() => window.print()} shape="circle" type="primary">
            <PrinterOutlined />
          </Button>
        }
        subtitle={
          <Tooltip title={<FormattedMessage id="last.modified.date" />}>
            {data && dayjs(data.updatedAt).format("LL")}
          </Tooltip>
        }
        title={
          <FormattedMessage id={isUsersProfile ? "my.profile" : "profile"} />
        }
      />
      {data ? (
        <AllProfileCards
          connectionStatus={connectionStatus}
          isOwnersProfile={isUsersProfile}
          profileData={data}
        />
      ) : (
        <ErrorProfilePage
          subtitleId="profile.not.found.description"
          titleId="profile.not.found"
        />
      )}
    </AppLayout>
  );
};

ProfileLayoutView.propTypes = {
  connectionStatus: PropTypes.bool,
  data: ProfileInfoPropType,
  isLoading: PropTypes.bool,
  isUsersProfile: PropTypes.bool,
  savedFormContent: PropTypes.bool,
};

ProfileLayoutView.defaultProps = {
  connectionStatus: null,
  data: null,
  isLoading: true,
  isUsersProfile: null,
  savedFormContent: undefined,
};

export default ProfileLayoutView;
