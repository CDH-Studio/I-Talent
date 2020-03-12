import React, { Component } from "react";
import StatCardsView from "./StatCardsView";

class StatCards extends Component {
  dashboardCount(data) {
    const total_users = data.user;
    const inactive_users = data.inactive;
    const hiddenProfiles = data.flagged;
    const exFeeders = data.exFeeder;
    return { total_users, inactive_users, hiddenProfiles, exFeeders };
  }

  monthGrowthRate(data) {
    const growthRate = data.growthRateFromPreviousMonth;

    const current_month_additions = data.current_month_additions.count;

    return { growthRate, current_month_additions };
  }

  render() {
    const { data } = this.props;

    return (
      <StatCardsView
        dashboardCount={this.dashboardCount(data.dashboardCount)}
        monthGrowthRate={this.monthGrowthRate(data.growthRateByMonth)}
      />
    );
  }
}

export default StatCards;
