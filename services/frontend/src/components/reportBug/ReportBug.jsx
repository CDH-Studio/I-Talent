import useAxios from "../../utils/useAxios";
import ReportBugView from "./ReportBugView";

const ReportBug = () => {
  const axios = useAxios();

  const saveDataToDB = async (values) => {
    await axios.post("bugs", values);
  };

  return <ReportBugView saveDataToDB={saveDataToDB} />;
};

export default ReportBug;
