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
const DoneSetupView = ({ userId, load, visibleCards, editUrls, formType }) => {
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
                  className="success-icon"
                  aria-hidden="true"
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
            title={intl.formatMessage({ id: "current.visibility.setting" })}
            column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            size="small"
            bordered
            style={{ width: "80%", margin: "auto", marginBottom: "2rem" }}
          >
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.employmentEquityGroup}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({
                    id: "employment.equity.groups",
                  })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="employment.equity.groups" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.employmentEquityGroup)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.info}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "employment.status" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="employment.status" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.info)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.description}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "about.me" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="about.me" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.description)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.officialLanguage}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "official.languages" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="official.languages" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.officialLanguage)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.skills}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "skills" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="skills" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.skills)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.mentorshipSkills}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "mentorship.skills" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="mentorship.skills" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.mentorshipSkills)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.competencies}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "competencies" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="competencies" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.competencies)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.education}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "education" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="education" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.education)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.experience}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "experience" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="experience" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.experience)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.developmentalGoals}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "learning.development" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="learning.development" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.developmentalGoals)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.qualifiedPools}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "qualified.pools" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="qualified.pools" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.qualifiedPools)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.careerInterests}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "career.interests" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="career.interests" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.careerInterests)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.talentManagement}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "talent.management" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="talent.management" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.talentManagement)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Link
                  to={editUrls.exFeeder}
                  aria-label={` ${intl.formatMessage({
                    id: "edit",
                  })} ${intl.formatMessage({ id: "ex.feeder" })}`}
                >
                  <EditOutlined className="mr-1" aria-hidden="true" />
                  <FormattedMessage id="ex.feeder" />
                </Link>
              }
            >
              {getCardStatusElement(visibleCards.exFeeder)}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Skeleton />
        )}
      </div>
      <Button
        icon={<SearchOutlined />}
        size="large"
        className="mx-3 my-2"
        // style={{ marginRight: "25px" }}
        onClick={() => history.push(`/`)}
      >
        <span>
          <FormattedMessage id="search.profiles" />
        </span>
      </Button>
      <Button
        icon={<UserOutlined />}
        size="large"
        type="primary"
        className="mx-3 my-2"
        onClick={() => history.push(`/profile/${userId}`)}
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
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  editUrls: PropTypes.objectOf(PropTypes.string).isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
};

export default DoneSetupView;
