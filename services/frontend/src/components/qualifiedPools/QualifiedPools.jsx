import { useMemo } from "react";
import { useIntl } from "react-intl";
import { LinkOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import QualifiedPoolsView from "./QualifiedPoolsView";

/**
 * Generate a list of qualified pools
 * @param {Object[]} qualifiedPools list of save equity groups
 * @param {Object} intl intl object
 * @return {Object[]} formatted list of qualified pools
 */
const getQualifiedPoolsInfo = (qualifiedPools, intl) =>
  qualifiedPools && qualifiedPools.length > 0
    ? qualifiedPools.map(
        ({
          classification,
          jobTitle,
          selectionProcessNumber,
          jobPosterLink,
        }) => ({
          classification: classification.name,
          jobPosterLink: [
            {
              href: jobPosterLink,
              icon: <LinkOutlined />,
              key: jobPosterLink,
              label: intl.formatMessage({ id: "job.poster" }),
            },
          ],
          jobTitle,
          selectionProcessNumber,
        })
      )
    : [];

const QualifiedPools = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formattedEmploymentEquityData = useMemo(
    () => getQualifiedPoolsInfo(data.qualifiedPools, intl),
    [data.qualifiedPools, intl]
  );

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
      <QualifiedPoolsView qualifiedPoolsInfo={formattedEmploymentEquityData} />
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
