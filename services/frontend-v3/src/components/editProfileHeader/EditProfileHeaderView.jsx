import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Button, PageHeader } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";

const EditProfileHeaderView = (props) => {
  // get current language code
  let locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  return (
    <Row
      align="middle"
      style={{
        padding: "0 0 15px 7px",
      }}
    >
      <Button
        type="link"
        icon={
          <LeftCircleFilled
            style={{
              fontSize: "22px",
              marginRight: "-20px",
              color: "#087472",
            }}
          />
        }
        onClick={props.returnToProfile}
      />
      <PageHeader
        style={{
          textTransform: locale === "en" ? "capitalize" : "",
        }}
        title={<FormattedMessage id="edit.profile" />}
      />
    </Row>
  );
};

export default injectIntl(EditProfileHeaderView);
