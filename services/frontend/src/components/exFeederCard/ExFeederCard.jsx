import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import ExFeederCardView from "./ExFeederCardView";

const ExFeederCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      cardName="exFeeder"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/career-management?tab=ex-feeder"
      id="card-profile-ex-feeder"
      titleString={intl.formatMessage({ id: "ex.feeder" })}
      visibility={data.visibleCards.exFeeder}
    >
      <ExFeederCardView data={data} />
    </ProfileCards>
  );
};

ExFeederCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

ExFeederCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default ExFeederCard;
