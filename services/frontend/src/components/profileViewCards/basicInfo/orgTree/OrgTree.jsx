import PropTypes from "prop-types";
import OrgTreeView from "./OrgTreeView";

const OrgTree = ({ data }) => {
  return <OrgTreeView data={data} />;
};

OrgTree.propTypes = {
  data: PropTypes.shape({
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        key: PropTypes.string,
        tier: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default OrgTree;
