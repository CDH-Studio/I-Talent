import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import ProfileCardWrapperView from "./ProfileCardWrapperView";

const ProfileCardWrapper = ({
  data,
  titleString,
  children,
  editUrl,
  cardName,
  id,
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  lastUpdated,
}) => (
  <ProfileCardWrapperView
    cardName={cardName}
    displayExtraHeaderContent={displayExtraHeaderContent}
    editableCardBool={editableCardBool}
    editUrl={editUrl}
    id={id}
    lastUpdated={lastUpdated}
    titleString={titleString}
    visibility={visibility}
    visibleCards={data.visibleCards}
  >
    {visibility ? children : null}
  </ProfileCardWrapperView>
);

ProfileCardWrapper.propTypes = {
  cardName: PropTypes.string.isRequired,
  children: PropTypes.element,
  data: ProfileInfoPropType,
  displayExtraHeaderContent: PropTypes.bool,
  editUrl: PropTypes.string,
  editableCardBool: PropTypes.bool,
  id: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  titleString: PropTypes.string.isRequired,
  visibility: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
  ]),
};

ProfileCardWrapper.defaultProps = {
  children: null,
  data: null,
  displayExtraHeaderContent: true,
  editUrl: null,
  editableCardBool: false,
  lastUpdated: null,
  visibility: null,
};

export default ProfileCardWrapper;
