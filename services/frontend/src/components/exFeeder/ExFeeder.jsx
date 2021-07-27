import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ExFeederView from "./ExFeederView";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";

const ExFeeder = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "ex.feeder" })}
      cardName="exFeeder"
      editUrl="/profile/edit/career-management?tab=ex-feeder"
      id="card-profile-ex-feeder"
      data={data}
      editableCardBool={editableCardBool}
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
