import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Divider, Typography } from "antd";

import AppLayout from "../components/layouts/appLayout/AppLayout";

const TermsAndConditions = () => {
  const intl = useIntl();
  const { Title, Text } = Typography;

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "terms.and.conditions.page.title" })} | I-Talent`;
  }, [intl]);

  return (
    <AppLayout displaySearch={false} displaySideBar={false}>
      <Title level={2}>
        <FormattedMessage id="terms.and.conditions.page.title" />
      </Title>
      <Divider />
      <Text>
        <FormattedMessage 
          id="terms.and.conditions.page.text"
          values={{
            a: (chunks) => {
              if (chunks[0] && (chunks[0] === "I-Talent Service Experts - Experts du service I-Talent" || chunks[0] === "I-Talent Service Experts - Experts du service I-Talent")) {
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
              if (chunks[0] && (chunks[0] === "Values and Ethics Code for the Public Sector" || chunks[0] === "Code de valeurs et d’éthique du secteur public")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=25049"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Policy on Official Languages" || chunks[0] === "Politique sur les langues officielles")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=26160"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Directive on Official Languages for Communications and Services" || chunks[0] === "Directive sur les langues officielles pour les communications et services")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=26164&section=text#cha2"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Policy on Information Management" || chunks[0] === "Politique sur la gestion de l’information")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=12742"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Copyright Act" || chunks[0] === "Loi sur le droit d’auteur")) {
                return (
                  <a
                    className="external_link"
                    href="http://laws.justice.gc.ca/eng/acts/C-42/index.html"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Policy on Acceptable Network and Device Use" || chunks[0] === "Politique sur l’utilisation acceptable des dispositifs et des réseaux")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?section=text&id=27122"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Guideline to acceptable use of Internal wikis and blogs within the Government of Canada" || chunks[0] === "Ligne directrice sur l’utilisation acceptable des wikis et des blogues internes au gouvernement du Canada")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?section=text&id=17555"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "departmental policy on acceptable use of electronic networks" || chunks[0] === "notre politique ministérielle relative à l’utilisation acceptable des réseaux électroniques")) {
                return (
                  <a
                    className="external_link"
                    href="http://icweb.ic.gc.ca/eic/site/029.nsf/eng/00024.html"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "TBS Standard on Web Accessibility" || chunks[0] === "Norme du SCT sur l'accessibilité des sites Web")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=23601&section=text"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Appendix C" || chunks[0] === "annexe C")) {
                return (
                  <a
                    className="external_link"
                    href="http://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=27122&section=text#appC"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Library and Archives of Canada Act" || chunks[0] === "Loi sur la Bibliothèque et les Archives du Canada")) {
                return (
                  <a
                    className="external_link"
                    href="https://laws-lois.justice.gc.ca/eng/acts/L-7.7/index.html"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                )
              }
              if (chunks[0] && (chunks[0] === "Privacy Act" || chunks[0] === "Loi sur la protection des renseignements personnels")) {
                return (
                  <a
                    className="external_link"
                    href="https://www.gcpedia.gc.ca/wiki/Wiki_Access_to_Information_Act_and_Privacy_Act_Guidelines"
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
                  href="/terms-and-conditions"
                  rel="noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              )
            },
            b: (chunks) => <strong>{chunks}</strong>,
            br: () => <br />,
            li: (chunks) => <li>{chunks}</li>,
            ul: (chunks) => <ul>{chunks}</ul>,
          }}
        />
      </Text>
    </AppLayout>
  );
};

export default TermsAndConditions;
