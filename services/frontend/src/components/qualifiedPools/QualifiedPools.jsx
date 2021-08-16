import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import QualifiedPoolsView from "./QualifiedPoolsView";

const QualifiedPools = ({ data, editableCardBool }) => {
  const intl = useIntl();

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
        jobPosterLink,
        jobTitle,
        selectionProcessNumber,
      })
    );
  };

  return (
    <ProfileCards
      cardName="qualifiedPools"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/career-management?tab=qualified-pools"
      id="card-profile-qualified-pools"
      titleString={intl.formatMessage({ id: "qualified.pools" })}
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
