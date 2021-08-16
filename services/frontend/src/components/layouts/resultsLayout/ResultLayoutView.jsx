import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";

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
