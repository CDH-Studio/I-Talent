import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, Skeleton, Tag, Typography } from "antd";
import PropTypes from "prop-types";

import "./DoneSetupView.less";

const { Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ userId, load, saved, visibilityItems, formType }) => {
  const history = useHistory();
  const intl = useIntl();

  const getTag = (colour, message) => (
    <>
      <Tag color={colour}>
        <FormattedMessage id={message} />
      </Tag>
    </>
  );

  const getCardStatusElement = (cardStatus) => {
    switch (cardStatus) {
      case "PRIVATE":
        return getTag("red", "visibility.card.private");
      case "PUBLIC":
        return getTag("green", "visibility.card.public");
      case "CONNECTIONS":
        return getTag("blue", "connections");

      default:
        return <p>None</p>;
    }
  };

  const titleText = () => {
    if (formType === "create") {
      return <FormattedMessage id="setup.all.done" />;
    }
    if (saved === "true") {
      return <FormattedMessage id="edit.save.success" />;
    }
    return <FormattedMessage id="setup.done" />;
  };

  return (
    <div className="done-content">
      <div className="done-success-message">
        <table>
          <tbody>
            <tr>
              <td className="success-icon-col">
                <CheckCircleOutlined
                  aria-hidden="true"
                  className="success-icon"
                />
              </td>
              <td className="success-message-col">
                <Paragraph className="success-main-message" strong>
                  {titleText()}
                </Paragraph>
                {formType === "create" ? (
                  <Paragraph className="success-secondary-message">
                    <FormattedMessage id="setup.done.description" />
                  </Paragraph>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "left" }}>
        <Paragraph className="done-action" strong>
          <FormattedMessage id="setup.done.action" />
        </Paragraph>
        {load ? (
          <Descriptions
            bordered
            column={{ lg: 1, md: 1, sm: 1, xl: 1, xs: 1, xxl: 2 }}
            size="small"
            style={{ margin: "auto", marginBottom: "2rem", width: "80%" }}
            title={intl.formatMessage({ id: "current.visibility.setting" })}
          >
            {visibilityItems.map((item) => (
              <Descriptions.Item
                label={
                  <Link
                    aria-label={` ${intl.formatMessage({
                      id: "edit",
                    })} ${intl.formatMessage({
                      id: item.label,
                    })}`}
                    to={item.url}
                  >
                    <EditOutlined aria-hidden="true" className="mr-1" />
                    <FormattedMessage id={item.label} />
                  </Link>
                }
              >
                {getCardStatusElement(item.visibility)}
              </Descriptions.Item>
            ))}
          </Descriptions>
        ) : (
          <Skeleton />
        )}
      </div>
      <Button
        className="mx-3 my-2"
        icon={<SearchOutlined />}
        onClick={() => history.push(`/`)}
        size="large"
      >
        <span>
          <FormattedMessage id="search.profiles" />
        </span>
      </Button>
      <Button
        className="mx-3 my-2"
        icon={<UserOutlined />}
        onClick={() => history.push(`/profile/${userId}`)}
        size="large"
        type="primary"
      >
        <span>
          <FormattedMessage id="view.profile" />
        </span>
      </Button>
    </div>
  );
};

DoneSetupView.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  load: PropTypes.bool.isRequired,
  saved: PropTypes.string,
  userId: PropTypes.string.isRequired,
  visibilityItems: PropTypes.objectOf(PropTypes.object).isRequired,
};

DoneSetupView.defaultProps = { saved: false };

export default DoneSetupView;
