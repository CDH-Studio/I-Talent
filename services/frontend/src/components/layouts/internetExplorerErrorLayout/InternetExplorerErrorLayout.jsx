import IeLayoutView from "./InternetExplorerErrorLayoutView";

/**
 *  LandingLayoutView(props)
 *
 *  Component that renders the landing page.
 */
const InternetExplorerErrorLayout = () => {
  /*
   * Redirect browser to edge
   *
   * Open page in Microsoft Edge
   */
  const redirectBrowser = () => {
    window.location = `microsoft-edge:${window.location}`;
  };

  return <IeLayoutView redirectBrowser={redirectBrowser} />;
};

export default InternetExplorerErrorLayout;
