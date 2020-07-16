import React from "react";
import PropTypes from "prop-types";
import ConnectionsView from "./ConnectionsView";
import ProfileCards from "../profileCards/ProfileCards";

const connections = ({ data, title, cardName, id, type, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<ConnectionsView connections={data.connections} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible
    />
  );
};

connections.propTypes = {
  data: PropTypes.shape({
    connections: PropTypes.array,
  }).isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  editUrl: PropTypes.string,
};

connections.defaultProps = {
  type: null,
  editUrl: "",
};

export default connections;
