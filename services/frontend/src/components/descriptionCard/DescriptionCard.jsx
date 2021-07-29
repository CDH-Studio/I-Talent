import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ProfileCards from "../profileCards/ProfileCards";
import DescriptionCardView from "./DescriptionCardView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const DescriptionCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "about.me" })}
      cardName="description"
      id="card-profile-description"
      editUrl="/profile/edit/employment"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.description}
    >
      <DescriptionCardView data={data.description} />
    </ProfileCards>
  );
};

DescriptionCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

DescriptionCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default DescriptionCard;
