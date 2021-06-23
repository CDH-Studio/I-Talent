import { Link } from "react-router-dom";
import { Typography, Button, Descriptions, Tag, Skeleton } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import "./DoneSetupView.less";

const { Title, Paragraph } = Typography;

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetupView = ({ userId, load, visibleCards, editUrls }) => {
  const history = useHistory();

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
      <CheckCircleOutlined
        style={{
          color: "#087472",
          fontSize: "85px",
        }}
      />
      <Title
        level={1}
        style={{
          color: "#001529",
          opacity: 0.7,
          marginTop: "15px",
        }}
      >
        <FormattedMessage id="setup.all.done" />
      </Title>
      <Paragraph className="done-subHeading">
        <FormattedMessage id="setup.done.description" />
      </Paragraph>
      <Paragraph className="done-subHeading" strong>
        <FormattedMessage id="setup.done.action" />
      </Paragraph>
      {load ? (
        <Descriptions
          column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          size="small"
          bordered
          style={{ width: "80%", margin: "auto", marginBottom: "2rem" }}
        >
          <Descriptions.Item
            label={
              <Link to={editUrls.employmentEquityGroup}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="employment.equity.groups" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.employmentEquityGroup)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.info}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="employment.status" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.info)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.description}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="about.me" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.description)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.officialLanguage}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="official.languages" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.officialLanguage)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.skills}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="skills" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.skills)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.mentorshipSkills}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="mentorship.skills" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.mentorshipSkills)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.competencies}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="competencies" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.competencies)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.education}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="education" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.education)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.experience}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="experience" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.experience)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.developmentalGoals}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="learning.development" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.developmentalGoals)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.qualifiedPools}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="qualified.pools" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.qualifiedPools)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.careerInterests}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="career.interests" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.careerInterests)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.talentManagement}>
                <LinkOutlined className="mr-1" />
                <FormattedMessage id="talent.management" />
              </Link>
            }
          >
            {getCardStatusElement(visibleCards.talentManagement)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Link to={editUrls.exFeeder}>
                <LinkOutlined className="mr-1" />
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
      <Button
        icon={<SearchOutlined />}
        size="large"
        style={{ marginRight: "25px" }}
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
};

export default DoneSetupView;
