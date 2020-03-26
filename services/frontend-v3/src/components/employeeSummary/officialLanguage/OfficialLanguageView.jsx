import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Row, Col, List } from "antd";

class OfficialLanguageView extends Component {
  generateFirstLanguage(dataSource) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  }

  getFisrtLanguageInfo(locale) {
    const data = this.props.data;

    const firstLanguage = {
      title: <FormattedMessage id="profile.first.language" />,
      description:
        data.firstLanguage === undefined ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          data.firstLanguage[locale]
        )
    };
    return [firstLanguage];
  }

  generateSecondLanguageProficiency(dataSource) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  }

  getSecondLanguageGradeInfo(locale) {
    const data = this.props.data;

    const secondaryReadingProficiency = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        data.secondaryReadingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          data.secondaryReadingProficiency
        )
    };

    const secondaryWritingProficiency = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        data.secondaryWritingProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          data.secondaryWritingProficiency
        )
    };

    const secondaryOralProficiency = {
      title: <FormattedMessage id="profile.oral" />,
      description:
        data.secondaryOralProficiency === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          data.secondaryOralProficiency
        )
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency
    ];
  }

  getSecondLanguageDateInfo() {
    const data = this.props.data;

    const formatedReadingDate = moment(data.secondaryReadingDate).format("ll");
    const formatedWritingDate = moment(data.secondaryWritingDate).format("ll");
    const formatedOralDate = moment(data.secondaryOralDate).format("ll");

    const secondaryReadingDate = {
      title: <FormattedMessage id="profile.reading" />,
      description:
        data.secondaryReadingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedReadingDate
        )
    };

    const secondaryWritingDate = {
      title: <FormattedMessage id="profile.writing" />,
      description:
        data.secondaryWritingDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedWritingDate
        )
    };

    const secondaryOralDate = {
      title: <FormattedMessage id="profile.oral" />,
      description:
        data.secondaryOralDate === null ? (
          <FormattedMessage id="profile.not.specified" />
        ) : (
          formatedOralDate
        )
    };

    return [secondaryReadingDate, secondaryWritingDate, secondaryOralDate];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const firstLanguageInfo = this.getFisrtLanguageInfo(locale);
    const secondLanguageGradeInfo = this.getSecondLanguageGradeInfo(locale);
    const secondLanguageDateInfo = this.getSecondLanguageDateInfo(locale);

    return (
      <>
        <Row>
          <Col xs={24} lg={12}>
            {this.generateFirstLanguage(firstLanguageInfo)}
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={12}>
            {this.generateSecondLanguageProficiency(secondLanguageGradeInfo)}
          </Col>
          <Col xs={24} lg={12}>
            {this.generateSecondLanguageProficiency(secondLanguageDateInfo)}
          </Col>
        </Row>
      </>
    );
  }
}

/* Component Styles */
const styles = {
  card: {
    height: "100%"
  },
  avatar: {
    backgroundColor: "#007471"
  }
};

export default injectIntl(OfficialLanguageView);
