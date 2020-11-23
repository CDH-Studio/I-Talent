import PropTypes from "prop-types";
import ConnectionsView from "./ConnectionsView";
import ProfileCards from "../profileCards/ProfileCards";

const connections = ({ data }) => (
  <ProfileCards
    titleId="profile.connections"
    cardName="privateGroup"
    id="card-profile-connections"
    data={data}
    editableCardBool={false}
    displayExtraHeaderContent={false}
    visibility="PUBLIC"
  >
    <ConnectionsView connections={data.connections} />
  </ProfileCards>
);

connections.propTypes = {
  data: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    connections: PropTypes.array,
  }).isRequired,
};

export default connections;
