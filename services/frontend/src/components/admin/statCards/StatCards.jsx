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
      countExFeederUsers={count.exFeederUsers}
      countHiddenUsers={count.hiddenUsers}
      countInactiveUsers={count.inactiveUsers}
      countUsers={count.users}
      growthRatePrevMonth={growthRate.month.growthRateFromPreviousMonth}
      newUsers={growthRate.month.currentMonthNewUserCount}
    />
  );
};

export default StatCards;
