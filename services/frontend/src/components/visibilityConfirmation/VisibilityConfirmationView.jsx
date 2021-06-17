import PropTypes from "prop-types";
import { Button, Descriptions, Drawer, Tag } from "antd";
import { FormattedMessage } from "react-intl";
import "./VisibilityConfirmationView.less";

const VisibilityConfirmationView = ({
  visibleCards,
  visible,
  onOk,
  onCloseDrawer,
}) => {
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

  const onClickOk = () => {
    onOk();
    onCloseDrawer();
  };

  return (
    <Drawer
      title={<FormattedMessage id="visibility.review.title" />}
      visible={visible}
      onOk={onClickOk}
      onClose={onCloseDrawer}
      width="450"
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            <FormattedMessage id="cancel" />
          </Button>
          <Button onClick={onClickOk} type="primary">
            <FormattedMessage id="save" />
          </Button>
        </div>
      }
    >
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item
          label={<FormattedMessage id="employment.equity.groups" />}
        >
          {getCardStatusElement(visibleCards.employmentEquityGroup)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="employment.status" />}>
          {getCardStatusElement(visibleCards.info)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="about.me" />}>
          {getCardStatusElement(visibleCards.description)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="official.languages" />}>
          {getCardStatusElement(visibleCards.officialLanguage)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="skills" />}>
          {getCardStatusElement(visibleCards.skills)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="mentorship.skills" />}>
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
        <Descriptions.Item label={<FormattedMessage id="talent.management" />}>
          {getCardStatusElement(visibleCards.talentManagement)}
        </Descriptions.Item>
        <Descriptions.Item label={<FormattedMessage id="ex.feeder" />}>
          {getCardStatusElement(visibleCards.exFeeder)}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

VisibilityConfirmationView.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCloseDrawer: PropTypes.func.isRequired,
};

VisibilityConfirmationView.defaultProps = {
  onOk: () => {},
};

export default VisibilityConfirmationView;
