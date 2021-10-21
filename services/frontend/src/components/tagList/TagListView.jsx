import { FormattedMessage } from "react-intl";
import { Tag } from "antd";
import PropTypes from "prop-types";

import "./TagListView.less";

const TagListView = ({ data, tagStyle }) => {
  /**
   * Generate the icon to be displayed inside the tag
   * @param {React.ReactElement} icon - Icon to be rendered
   * @returns {React.ReactElement} - React Element
   */
  const generateTagIcon = (icon) =>
    icon && (
      <span aria-hidden="true" className="mr-1">
        {icon}
      </span>
    );

  /**
   * Generate the individual tag to be rendered
   * @param {object} tagInfo - Icon to be rendered
   * @param {string} tagInfo.label - label of tag
   * @param {React.ReactElement} tagInfo.icon - icon of tag
   * @param {(primary|secondary|link)} tagInfo.type - type of tag to determine styling
   * @returns {React.ReactElement} - React Element
   */
  const generateTag = ({ label, icon, type }) => {
    const tagStyleName = `tag tag-${type}`;
    return (
      <Tag className={tagStyleName}>
        {icon && generateTagIcon(icon)}
        {label}
      </Tag>
    );
  };

  /**
   * Generate the individual tag to be rendered
   * @param {object} tagInfo - Icon to be rendered
   * @param {string} tagInfo.href - the url to attach to tag
   * @param {string} tagInfo.label - label of tag
   * @param {React.ReactElement} tagInfo.icon - icon of tag
   * @returns {React.ReactElement} - React Element
   */
  const generateTagWithLink = ({ href, label, icon }) => (
    <a
      className="linkTag"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {generateTag({ icon, label, type: "link" })}
      <span className="screenReaderOnly">
        <FormattedMessage id="opens.in.new.tab" />
      </span>
    </a>
  );

  return (
    <ul className="tagList">
      {data.map((item) => (
        <li key={item.key}>
          {item.href
            ? generateTagWithLink({
                href: item.href,
                icon: item.icon,
                label: item.label,
              })
            : generateTag({
                icon: item.icon,
                label: item.label,
                type: tagStyle,
              })}
        </li>
      ))}
    </ul>
  );
};

TagListView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.node,
      key: PropTypes.string,
      label: PropTypes.node,
    })
  ).isRequired,
  tagStyle: PropTypes.oneOf(["primary", "secondary", "link"]).isRequired,
};

export default TagListView;
