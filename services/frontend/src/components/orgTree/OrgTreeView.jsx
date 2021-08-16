import "./OrgTreeView.less";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Tree, Typography } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const { Text } = Typography;

const OrgTreeView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const titleString = (title) => {
    if (typeof title === "object") {
      return title[locale].toUpperCase();
    }
    return title.toUpperCase();
  };

  const genTreeBranch = (orgData) => {
    let retVal = [];
    const branchSize = orgData.length;
    for (let i = 0; i < branchSize; i += 1) {
      const val = orgData[branchSize - i - 1];
      const object = {
        key: val.id,
        title: titleString(val.title),
      };
      if (retVal.length !== 0) {
        object.children = [retVal];
      }
      retVal = object;
    }
    return retVal;
  };

  if (data.organizations) {
    const treeData = [genTreeBranch(data.organizations)];
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

export default OrgTreeView;
