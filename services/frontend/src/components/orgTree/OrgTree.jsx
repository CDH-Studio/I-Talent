import PropTypes from "prop-types";

import OrgTreeView from "./OrgTreeView";

const OrgTree = ({ data }) => <OrgTreeView data={data} />;

OrgTree.propTypes = {
  data: PropTypes.shape({
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        tier: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default OrgTree;
