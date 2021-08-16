import { Tree, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./OrgTreeView.less";

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
        title: titleString(val.title),
        key: val.id,
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
        title: PropTypes.string,
        key: PropTypes.string,
        tier: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default OrgTreeView;
