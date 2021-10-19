import { Tag } from "antd";
import PropTypes from "prop-types";

import "./TagListView.less";

const TagListView = ({ data }) => (
  <ul className="tagList">
    {data.map((item) => (
      <li key={item.key}>
        <Tag className="primaryTag" color="#00605e">
          {item.label}
        </Tag>
      </li>
    ))}
  </ul>
);

TagListView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
    })
  ).isRequired,
};

export default TagListView;
