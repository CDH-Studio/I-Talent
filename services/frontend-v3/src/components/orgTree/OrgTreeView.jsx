import React from "react";
import { Tree } from "antd";
import _ from "lodash";

import { useSelector } from "react-redux";

const OrgTreeView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const treeData = [];

  const titleString = (title) => {
    if (typeof title === "object") {
      return title[locale === "FRENCH" ? "fr" : "en"];
    }
    return title;
  };
  console.log("org tree", data, locale);
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

  return (
    <Tree
      style={{ borderStyle: "1px solid #f0f0f0" }}
      defaultExpandAll
      defaultExpandParent
      treeData={treeData}
    />
  );
};

export default OrgTreeView;
