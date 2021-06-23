import { Typography, Button, Descriptions, Tag, Skeleton } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CheckCircleOutlined,
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
const DoneSetupView = ({ userId, load, visibleCards }) => {
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
            label={<FormattedMessage id="employment.equity.groups" />}
          >
            {getCardStatusElement(visibleCards.employmentEquityGroup)}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="employment.status" />}
          >
            {getCardStatusElement(visibleCards.info)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="about.me" />}>
            {getCardStatusElement(visibleCards.description)}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="official.languages" />}
          >
            {getCardStatusElement(visibleCards.officialLanguage)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="skills" />}>
            {getCardStatusElement(visibleCards.skills)}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="mentorship.skills" />}
          >
            {getCardStatusElement(visibleCards.mentorshipSkills)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="competencies" />}>
            {getCardStatusElement(visibleCards.competencies)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="education" />}>
            {getCardStatusElement(visibleCards.education)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="experience" />}>
            {getCardStatusElement(visibleCards.experience)}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="learning.development" />}
          >
            {getCardStatusElement(visibleCards.developmentalGoals)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="qualified.pools" />}>
            {getCardStatusElement(visibleCards.qualifiedPools)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="career.interests" />}>
            {getCardStatusElement(visibleCards.careerInterests)}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage id="talent.management" />}
          >
            {getCardStatusElement(visibleCards.talentManagement)}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="ex.feeder" />}>
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
};

export default DoneSetupView;
