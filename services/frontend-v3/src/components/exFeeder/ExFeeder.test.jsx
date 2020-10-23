import React from "react";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";

//import ExFeederCard from "./ExFeeder";
import AppProvider from "../../utils/AppProvider";

const data = {
  exFeeder: true,
  visibleCards: {
    exFeeder: true,
  },
};

// const i18nConfigBuilder = (locale) => ({
//   messages: locale === "ENGLISH" ? messagesEn : messagesFr,
//   formats: {
//     number: {
//       CAD: {
//         style: "currency",
//         currency: "USD",
//         currencyDisplay: "symbol",
//       },
//     },
//   },
// });

// PropTypes.bool,
// PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),

// test("Test render of edit menu", () => {
//   const { getByText } = render(<ExFeeder data={data} editableCardBool={true} />;);

//   <ExFeeder data={data} editableCardBool={true} />;
//   getByText("Test Title");
// });

test("Test header with just main text", async () => {
  const { getByText } = render(
    // <IntlProvider
    //   locale={"en"}
    //   messages={i18nConfig.messages}
    //   formats={i18nConfig.formats}
    // >
    <AppProvider>
      <ExFeederCard data={data} editableCardBool={false} />
    </AppProvider>

    // </IntlProvider>
  );
  getByText("I am nominated in the EX-feeder program");
});

// test("Test header with main text and extra content", async () => {
//   const { getByText } = render(<Header title="Test Title" extra="extra" />);
//   getByText("Test Title");
//   getByText("extra");
// });
