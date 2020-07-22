import React from "react";
import { Tree } from "antd";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const OrgTreeView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const treeData = [];

  const titleString = (title) => {
    if (typeof title === "object") {
      return title[locale];
    }
    return title;
  };

  const genTreeBranch = (orgData) => {
    let retVal = [];
    const branchSize = orgData.length;
    for (let i = 0; i < branchSize; i += 1) {
      const val = orgData[branchSize - i - 1];
      retVal = {
        title: titleString(val.title),
        key: val.id,
        children: [retVal],
      };
    }
    return retVal;
  };

  data.organizations.forEach((org) => {
    treeData.push(genTreeBranch(org));
  });

  return <Tree defaultExpandAll defaultExpandParent treeData={treeData} />;
};

OrgTreeView.propTypes = {
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

export default OrgTreeView;
