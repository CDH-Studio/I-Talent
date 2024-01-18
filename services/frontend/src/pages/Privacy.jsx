import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Divider, Typography } from "antd";

import AppLayout from "../components/layouts/appLayout/AppLayout";

const Privacy = () => {
  const intl = useIntl();
  const { Title, Text } = Typography;

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "about.page.title" })} | I-Talent`;
  }, [intl]);

  return (
    <AppLayout displaySearch={false} displaySideBar={false}>
      <Title level={2}>
        <FormattedMessage id="privacy.page.title" />
      </Title>
      <Divider />
      <Text>
        <FormattedMessage
          id="privacy.page.text"
          values={{
            a: (chunks) => {
              if (chunks[0] && chunks[0] === 'www.priv.gc.ca') {
                return (
                  <a
                    className="external_link"
                    href="https://www.priv.gc.ca/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === 'I-Talent Terms and Conditions of Use' || chunks[0] === "conditions d'utilisation d'I-Talent")) {
                return (
                  <a
                    className="external_link"
                    href="https://italent-uat-cms-studioup-dev.apps.ocp.dev.ised-isde.canada.ca/en/terms-and-conditions-use"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === 'IM/IT Policies, Directives, Standards and Guidelines' || chunks[0] === "politiques, directives, normes et lignes directrices de l'ISED en matière de GI/TI")) {
                return (
                  <a
                    className="external_link"
                    href="http://icweb.ic.gc.ca/eic/site/029.nsf/eng/h_00054.html"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === 'I-Talent Service Experts - Experts du service I-Talent' || chunks[0] === 'I-Talent Service Experts - Experts du service I-Talent')) {
                return (
                  <a
                    className="external_link"
                    href="mailto:ic.i-talentserviceexperts-expertsduservicei-talent.ic@canada.ca"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              return (
                <a
                  className="external_link"
                  href="/privacy"
                  rel="noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              )
            }
          }}
        />
      </Text>
    </AppLayout>
  );
};

export default Privacy;
