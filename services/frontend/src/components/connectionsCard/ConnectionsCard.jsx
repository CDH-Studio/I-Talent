import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import ProfileCards from "../profileCards/ProfileCards";
import ConnectionsCardView from "./ConnectionsCardView";

const connectionsCard = ({ data }) => {
  const intl = useIntl();
  return (
    <ProfileCards
      cardName="privateGroup"
      data={data}
      displayExtraHeaderContent={false}
      editableCardBool={false}
      id="card-profile-connections"
      titleString={intl.formatMessage({ id: "connections.info" })}
      visibility="PUBLIC"
    >
      <ConnectionsCardView connections={data.connections} />
    </ProfileCards>
  );
};

connectionsCard.propTypes = {
  data: PropTypes.shape({
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        firstname: PropTypes.string,
        id: PropTypes.string,
        lastname: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default connectionsCard;
