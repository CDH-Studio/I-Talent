import React from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { List } from "antd";
import { ProfileInfoPropType } from "../../customPropTypes";

const SecurityView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);
  return (
    <>
      <List.Item>
        <List.Item.Meta
          title={<FormattedMessage id="profile.security" />}
          description={
            data.security &&
            (data.security.description[locale] || (
              <FormattedMessage id="profile.not.specified" />
            ))
          }
        />
      </List.Item>
    </>
  );
};

SecurityView.propTypes = {
  data: ProfileInfoPropType,
};

SecurityView.defaultProps = {
  data: null,
};

export default SecurityView;
