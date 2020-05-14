import React from "react";
import PropTypes from "prop-types";
import StatCardsView from "./StatCardsView";

/**
 *  StatCards(props)
 *  Controller for the StatCardsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
const StatCards = ({ data }) => {
  /* gets data for the stat cards on dashboard */
  // Gets data for Total users, Inactive users, Hidden profiles, and Total Ex Feeders
  const dashboardCount = (dashboardCountData) => {
    if (dashboardCountData) {
      const totalUsers = dashboardCountData.user;
      const inactiveUsers = dashboardCountData.inactive;
      const hiddenProfiles = dashboardCountData.flagged;
      const exFeeders = dashboardCountData.exFeeder;
      return { totalUsers, inactiveUsers, hiddenProfiles, exFeeders };
    }
    return {};
  };

  /* gets monthly data for the stat cards on dashboard */
  // New users in month, and Growth rate in month
  const monthGrowthRate = (growthRateByMonthData) => {
    if (growthRateByMonthData) {
      const growthRate = growthRateByMonthData.growthRateFromPreviousMonth;

      const currentMonthAdditions =
        growthRateByMonthData.current_month_additions.count;

      return { growthRate, currentMonthAdditions };
    }
    return {};
  };

  return (
    <StatCardsView
      dashboardCount={dashboardCount(data.dashboardCount)}
      monthGrowthRate={monthGrowthRate(data.growthRateByMonth)}
    />
  );
};

StatCards.propTypes = {
  data: PropTypes.shape({
    compCount: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.shape({
          en: PropTypes.string,
          fr: PropTypes.string,
        }),
        count: PropTypes.number,
      })
    ),
    dashboardCount: PropTypes.shape({
      exFeeder: PropTypes.number,
      flagged: PropTypes.number,
      inactive: PropTypes.number,
      user: PropTypes.number,
    }),
    developCount: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.shape({
          en: PropTypes.string,
          fr: PropTypes.string,
        }),
        count: PropTypes.number,
      })
    ),
    flaggedProfiles: PropTypes.arrayOf(PropTypes.string),
    growthRateByMonth: PropTypes.shape({
      current_month_additions: PropTypes.shape({
        count: PropTypes.number,
        month: PropTypes.number,
        monthName: PropTypes.string,
      }),
      graphicalData: PropTypes.arrayOf(
        PropTypes.shape({
          year: PropTypes.string,
          monthNumber: PropTypes.number,
          monthName: PropTypes.string,
          count: PropTypes.number,
        })
      ),
      growthRateFromPreviousMonth: PropTypes.string,
    }),
    growthRateByWeek: PropTypes.arrayOf(PropTypes.number),
    skillCount: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.shape({
          en: PropTypes.string,
          fr: PropTypes.string,
        }),
        count: PropTypes.number,
      })
    ),
  }),
};

StatCards.defaultProps = { data: null };

export default StatCards;
