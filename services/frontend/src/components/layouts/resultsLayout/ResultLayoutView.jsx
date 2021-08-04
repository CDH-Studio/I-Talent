import AppLayout from "../appLayout/AppLayout";
import ResultsCard from "../../resultsCard/ResultsCard";
import SearchFilter from "../../searchFilter/SearchFilter";

const ResultLayoutView = () => (
  <AppLayout
    displaySideBar
    sideBarWidth={400}
    sideBarContent={<SearchFilter />}
  >
    <ResultsCard />
  </AppLayout>
);

export default ResultLayoutView;
