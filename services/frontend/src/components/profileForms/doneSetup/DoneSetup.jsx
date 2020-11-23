import { useSelector } from "react-redux";
import DoneSetupView from "./DoneSetupView";

/**
 *  DoneSetup(props)
 *
 *  Controller for the Done Setup Page.
 */
const DoneSetup = () => {
  const { id } = useSelector((state) => state.user);

  return <DoneSetupView userId={id} />;
};

export default DoneSetup;
