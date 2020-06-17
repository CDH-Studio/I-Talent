import React from "react";
import { useSelector } from "react-redux";
import StatCardsView from "./StatCardsView";

/**
 *  StatCards(props)
 *  Controller for the StatCardsView.
 *  It setups the data (bridge) for rendering the component in the view.
 */
const StatCards = () => {
  const { count, growthRate } = useSelector((state) => state.stats);

  return (
    <StatCardsView
      countUsers={count.users}
      countHiddenUsers={count.hiddenUsers}
      countInactiveUsers={count.inactiveUsers}
      countExFeederUsers={count.exFeederUsers}
      newUsers={growthRate.month.currentMonthNewUserCount}
      growthRatePrevMonth={growthRate.month.growthRateFromPreviousMonth}
    />
  );
};

export default StatCards;
