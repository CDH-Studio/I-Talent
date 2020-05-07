import React from "react";
import StatCardsView from "./StatCardsView";

/**
 *  StatCards(props)
 *  Controller for the StatCardsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
function StatCards(props) {
  const data = props.data;
  /* gets data for the stat cards on dashboard */
  // Gets data for Total users, Inactive users, Hidden profiles, and Total Ex Feeders
  const dashboardCount = (data) => {
    const total_users = data.user;
    const inactive_users = data.inactive;
    const hiddenProfiles = data.flagged;
    const exFeeders = data.exFeeder;
    return { total_users, inactive_users, hiddenProfiles, exFeeders };
  };

  /* gets monthly data for the stat cards on dashboard */
  // New users in month, and Growth rate in month
  const monthGrowthRate = (data) => {
    const growthRate = data.growthRateFromPreviousMonth;

    const current_month_additions = data.current_month_additions.count;

    return { growthRate, current_month_additions };
  };

  return (
    <StatCardsView
      dashboardCount={dashboardCount(data.dashboardCount)}
      monthGrowthRate={monthGrowthRate(data.growthRateByMonth)}
    />
  );
}

export default StatCards;
