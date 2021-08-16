import "./styling/accessibility.less";
import "./styling/custom_antd.less";
import "./styling/index.less";

import Routes from "./routes/Routes";
import AppProvider from "./utils/AppProvider";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
