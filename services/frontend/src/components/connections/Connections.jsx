import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ConnectionsView from "./ConnectionsView";
import ProfileCards from "../profileCards/ProfileCards";

const connections = ({ data }) => {
  const intl = useIntl();
  return (
    <ProfileCards
      titleString={intl.formatMessage({ id: "connections.info" })}
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
};

connections.propTypes = {
  data: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    connections: PropTypes.array,
  }).isRequired,
};

export default connections;
