import { Link } from "react-router-dom";
import { Typography, Button, Descriptions, Tag, Skeleton } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import "./DoneSetupView.less";

const { Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ userId, load, visibilityItems, formType }) => {
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
                  {formType === "create" ? (
                    <FormattedMessage id="setup.all.done" />
                  ) : (
                    <FormattedMessage id="edit.save.success" />
                  )}
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
            column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            size="small"
            style={{ width: "80%", margin: "auto", marginBottom: "2rem" }}
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
  userId: PropTypes.string.isRequired,
  load: PropTypes.bool.isRequired,
  visibilityItems: PropTypes.objectOf(PropTypes.object).isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default DoneSetupView;
