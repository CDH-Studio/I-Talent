import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";
import AppLayout from "../appLayout/AppLayout";

const ResultLayoutView = () => (
  <AppLayout
    displaySideBar
    sideBarContent={<SearchFilter />}
    sideBarWidth={400}
  >
    <ResultsCard />
  </AppLayout>
);

export default ResultLayoutView;
