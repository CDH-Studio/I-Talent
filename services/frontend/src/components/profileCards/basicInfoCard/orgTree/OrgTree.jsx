import PropTypes from "prop-types";

import OrgTreeView from "./OrgTreeView";

const OrgTree = ({ organizations }) => (
  <OrgTreeView organizations={organizations} />
);

OrgTree.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tier: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default OrgTree;
