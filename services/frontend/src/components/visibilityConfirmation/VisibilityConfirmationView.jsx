import PropTypes from "prop-types";
import { Descriptions, Modal, Tag } from "antd";
import { FormattedMessage } from "react-intl";

const VisibilityConfirmationView = ({
  visibleCards,
  visible,
  onOk,
  onCloseModal,
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
        return getTag("blue", "visibility.card.connections");

      default:
        return <p>None</p>;
    }
  };

  return (
    <Modal
      title={<FormattedMessage id="visibility.review.title" />}
      visible={visible}
      onOk={onOk}
      onCancel={onCloseModal}
      width="70%"
    >
      <Descriptions column={2} bordered>
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
    </Modal>
  );
};

VisibilityConfirmationView.propTypes = {
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default VisibilityConfirmationView;
