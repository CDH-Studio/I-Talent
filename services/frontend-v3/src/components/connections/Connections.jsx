import React from "react";
import PropTypes from "prop-types";
import ConnectionsView from "./ConnectionsView";
import ProfileCards from "../profileCards/ProfileCards";

const Connections = ({ data, title, cardName, id, type, visible, editUrl }) => {
  return (
    <ProfileCards
      title={title}
      content={<ConnectionsView Connections={data.connections} />}
      cardName={cardName}
      id={id}
      editUrl={editUrl}
      data={data}
      type={type}
      visible={visible}
    />
  );
};

Connections.propTypes = {
  data: PropTypes.shape({
    connections: PropTypes.array,
  }).isRequired,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  cardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  editUrl: PropTypes.string,
};

Connections.defaultProps = {
  type: null,
  visible: null,
  editUrl: "",
};

export default Connections;
