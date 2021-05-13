import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { render } from "react-dom";
import App from "./App";
import IeError from "./pages/InternetExplorerError";

if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
  render(<IeError />, document.getElementById("root"));
} else {
  render(<App />, document.getElementById("root"));
}
