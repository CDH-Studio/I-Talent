import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import ProfileCards from "../profileCards/ProfileCards";
import ConnectionsView from "./ConnectionsView";

const connections = ({ data }) => {
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
