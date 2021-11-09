import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tree, Typography } from "antd";
import { find } from "lodash";
import PropTypes from "prop-types";

import "./OrgTreeView.less";

const { Text } = Typography;

/**
 * Capitalize the branch title
 * @param {string} locale - the language of the profile
 * @param {Object[]} orgData - name of the card.
 * @param {string} orgData[].id - unique id for the org level.
 * @param {number} orgData[].tier - level of the org in the tree
 * @param {string} orgData[].title - title of the org level
 * @return {string} formatted title
 */
/* eslint-disable react/prop-types */
const titleString = (locale, title) => {
  if (typeof title === "object") {
    return title[locale].toUpperCase();
  }
  return title.toUpperCase();
};

/**
 * Generate right menu in card header
 * @param {string} locale - the language of the profile
 * @param {Object[]} orgData - array of objects describing each level of the org structure.
 * @param {string} orgData[].id - unique id for the org level.
 * @param {number} orgData[].tier - level of the org in the tree
 * @param {string} orgData[].title - title of the org level
 * @return {Object[]} formatted org tree
 */
/* eslint-disable react/prop-types */
const genTreeBranch = (locale, orgData) => {
  let retVal = [];

  for (let i = 0; i < orgData.length; i += 1) {
    const orgLevel = find(orgData, { tier: i });
    const object = {
      children: retVal.length !== 0 && [retVal],
      key: orgLevel.id,
      title: titleString(locale, orgLevel.title),
    };
    retVal = object;
  }

  return [retVal];
};

const OrgTreeView = ({ organizations }) => {
  const { locale } = useSelector((state) => state.settings);

  if (organizations) {
    const treeData = useMemo(
      () => genTreeBranch(locale, organizations),
      [locale, organizations]
    );
    return (
      <Tree
        defaultExpandAll
        defaultExpandParent
        selectable={false}
        showIcon
        treeData={treeData}
      />
    );
  }

  return (
    <div className="noBranchMessage">
      <InfoCircleOutlined />
      <Text>
        <FormattedMessage id="profile.org.tree.not.found" />
      </Text>
    </div>
  );
};

OrgTreeView.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tier: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default OrgTreeView;
