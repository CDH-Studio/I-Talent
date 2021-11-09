import PropTypes from "prop-types";

import TagListView from "./TagListView";

const TagList = ({ data, tagStyle }) => (
  <TagListView data={data} tagStyle={tagStyle} />
);

TagList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
    })
  ),
  tagStyle: PropTypes.oneOf(["primary", "secondary", "link"]),
};

TagList.defaultProps = {
  data: undefined,
  tagStyle: undefined,
};

export default TagList;
