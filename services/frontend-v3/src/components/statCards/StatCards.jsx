import React from "react";
import StatCardsView from "./StatCardsView";

function StatCards(props) {
  const dashboardCount = data => {
    const total_users = data.user;
    const inactive_users = data.inactive;
    const hiddenProfiles = data.flagged;
    const exFeeders = data.exFeeder;
    return { total_users, inactive_users, hiddenProfiles, exFeeders };
  };

  const monthGrowthRate = data => {
    const growthRate = data.growthRateFromPreviousMonth;

    const current_month_additions = data.current_month_additions.count;

    return { growthRate, current_month_additions };
  };

  const data = props.data;

  return (
    <StatCardsView
      dashboardCount={dashboardCount(data.dashboardCount)}
      monthGrowthRate={monthGrowthRate(data.growthRateByMonth)}
    />
  );
}

export default StatCards;
