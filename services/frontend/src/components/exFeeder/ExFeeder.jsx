import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import ExFeederView from "./ExFeederView";

const ExFeeder = ({ data, editableCardBool }) => {
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
      <ExFeederView data={data} />
    </ProfileCards>
  );
};

ExFeeder.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

ExFeeder.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default ExFeeder;
