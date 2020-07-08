import React from "react";
import { Tree } from "antd";
import _ from "lodash";

import { useSelector } from "react-redux";

const OrgTreeView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const treeData = [];

  const genTreeBranch = (orgData, index) => {
    const sortedData = _.orderBy(orgData, ["tier"], ["desc"]);
    console.log("srda", sortedData);
    let retVal = [];
    sortedData.forEach((val) => {
      console.log("rv", val);
      retVal = {
        title: "aaaaa",
        key: `${index}-${val.tier}`,
        children: [retVal],
      };
    });
    return retVal;
  };
  console.log("orgtree=>", data.organizations);
  data.organizations.forEach((org, index) => {
    console.log("oo", org.organizationTier);
    treeData.push(genTreeBranch(org.organizationTier, index));
  });

  return (
    //<div style={{ backgroundColor: "white" }}>
    <Tree defaultExpandAll defaultExpandParent treeData={treeData} />
    //</div>
  );
};

export default OrgTreeView;
