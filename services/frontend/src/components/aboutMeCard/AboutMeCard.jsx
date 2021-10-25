import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCardWrapper from "../profileCardWrapper/ProfileCardWrapper";
import AboutMeCardView from "./AboutMeCardView";

const AboutMeCard = ({ data, editableCardBool }) => {
  const intl = useIntl();

  return (
    <ProfileCardWrapper
      cardName="description"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/employment"
      id="card-profile-description"
      titleString={intl.formatMessage({ id: "about.me" })}
      visibility={data.visibleCards.description}
    >
      <AboutMeCardView data={data.description} />
    </ProfileCardWrapper>
  );
};

AboutMeCard.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

AboutMeCard.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default AboutMeCard;
