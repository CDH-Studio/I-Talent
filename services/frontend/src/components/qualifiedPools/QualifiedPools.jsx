import PropTypes from "prop-types";
import QualifiedPoolsView from "./QualifiedPoolsView";
import ProfileCards from "../profileCards/ProfileCards";
import { ProfileInfoPropType } from "../../utils/customPropTypes";

const QualifiedPools = ({ data, editableCardBool }) => {
  const getQualifiedPoolsInfo = (dataSource) => {
    if (!dataSource.qualifiedPools) {
      return [];
    }
    return dataSource.qualifiedPools.map(
      ({
        classification,
        jobTitle,
        selectionProcessNumber,
        jobPosterLink,
      }) => ({
        classification: classification.name,
        jobTitle,
        selectionProcessNumber,
        jobPosterLink,
      })
    );
  };

  return (
    <ProfileCards
      titleId="qualified.pools"
      cardName="qualifiedPools"
      id="card-profile-qualified-pools"
      editUrl="/profile/edit/career-management?tab=qualified-pools"
      data={data}
      editableCardBool={editableCardBool}
      visibility={data.visibleCards.qualifiedPools}
    >
      <QualifiedPoolsView qualifiedPoolsInfo={getQualifiedPoolsInfo(data)} />
    </ProfileCards>
  );
};

QualifiedPools.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

QualifiedPools.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default QualifiedPools;
