import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import { Row, Col, Card, List } from "antd";

class OfficialLanguageView extends Component {
  generateFirstLanguage(dataSource) {
    console.log("handling null and undefined", dataSource);
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
      icon: "mail",
      title: <FormattedMessage id="profile.first.language" />,
      description:
        data.firstLanguage === undefined
          ? "First language not provided"
          : data.firstLanguage[locale]
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
      icon: "mail",
      title: <FormattedMessage id="profile.reading" />,
      description:
        data.secondaryReadingProficiency === null
          ? "Grade not provided"
          : data.secondaryReadingProficiency
    };

    const secondaryWritingProficiency = {
      icon: "mail",
      title: <FormattedMessage id="profile.writing" />,
      description:
        data.secondaryWritingProficiency === null
          ? "Grade not provided"
          : data.secondaryWritingProficiency
    };

    const secondaryOralProficiency = {
      icon: "mail",
      title: <FormattedMessage id="profile.oral" />,
      description:
        data.secondaryOralProficiency === null
          ? "Grade not provided"
          : data.secondaryOralProficiency
    };

    return [
      secondaryReadingProficiency,
      secondaryWritingProficiency,
      secondaryOralProficiency
    ];
  }

  getSecondLanguageDateInfo(locale) {
    const data = this.props.data;
    const haha = moment(null);

    const formatedReadingDate = moment(data.secondaryReadingDate).format("LLL");
    const formatedWritingDate = moment(data.secondaryWritingDate).format("LLL");
    const formatedOralDate = moment(data.secondaryOralDate).format("LLL");

    const secondaryReadingDate = {
      icon: "mail",
      title: <FormattedMessage id="profile.reading" />,
      description:
        data.secondaryReadingDate === null
          ? "Date not provided"
          : formatedReadingDate
    };

    const secondaryWritingDate = {
      icon: "mail",
      title: <FormattedMessage id="profile.writing" />,
      description:
        data.secondaryWritingDate === null
          ? "Date not provided"
          : formatedWritingDate
    };

    const secondaryOralDate = {
      icon: "mail",
      title: <FormattedMessage id="profile.oral" />,
      description:
        data.secondaryOralDate === null ? "Date not provided" : formatedOralDate
    };

    return [secondaryReadingDate, secondaryWritingDate, secondaryOralDate];
  }

  render() {
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    const firstLanguageInfo = this.getFisrtLanguageInfo(locale);
    const secondLanguageGradeInfo = this.getSecondLanguageGradeInfo(locale);
    const secondLanguageDateInfo = this.getSecondLanguageDateInfo(locale);

    return (
      <Card
        style={styles.card}
        title={this.props.intl.formatMessage({
          id: "profile.official.language"
        })}
      >
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
      </Card>
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
