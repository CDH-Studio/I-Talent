import PropTypes from "prop-types";

import TagListView from "./TagListView";

const TagList = ({ data }) => <TagListView data={data} />;

TagList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
    })
  ),
};

TagList.defaultProps = {
  data: undefined,
};

export default TagList;
