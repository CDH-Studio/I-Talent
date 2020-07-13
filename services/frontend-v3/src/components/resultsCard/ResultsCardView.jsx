import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import {
  Row,
  Col,
  Tag,
  Card,
  Divider,
  Avatar,
  Typography,
  Empty,
  Skeleton,
  Badge,
  Tooltip,
  Button,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { HistoryPropType, ProfileInfoPropType } from "../../customPropTypes";
import prepareInfo from "../../functions/prepareInfo";

const { Meta } = Card;
const { Text } = Typography;

const ResultsCardView = ({
  history,
  results,
  locale,
  loading,
  userId,
  connections,
}) => {
  const styles = {
    smallP: {
      margin: 0,
      marginTop: -10,
    },
  };

  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a results card
   */
  const handleKeyPress = (e, person) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      history.push(`/secured/profile/${person.id}`);
    }
  };

  const renderCard = (person, key) => {
    const actions = [];
    const isConnection = connections.includes(person.id);
    let isFriend = true;

    if (person.id !== userId) {
      actions.push(
        <Button
          tabIndex="0"
          type="link"
          block
          icon={
            isConnection ? (
              <UserDeleteOutlined style={{ fontSize: 16, marginRight: 5 }} />
            ) : (
              <UserAddOutlined style={{ fontSize: 16, marginRight: 5 }} />
            )
          }
        >
          {isConnection ? (
            <FormattedMessage id="search.results.cards.add.connection" />
          ) : (
            <FormattedMessage id="search.results.cards.remove.connection" />
          )}
        </Button>
      );
    } else {
      isFriend = false;
    }

    return (
      <Col span={24} xxl={12} key={key}>
        <Card
          tabIndex="0"
          style={{
            height: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          size="small"
          hoverable
          bordered
          onClick={() => history.push(`/secured/profile/${person.id}`)}
          onKeyPress={(e) => handleKeyPress(e, person)}
          title={person.branch ? <Text>{person.branch}</Text> : undefined}
          extra={
            person.groupLevel && person.groupLevel.name ? (
              <Text>{`${person.groupLevel.name}`}</Text>
            ) : undefined
          }
          actions={actions}
          bodyStyle={{ flex: 1 }}
        >
          <Row>
            <Col>
              <Row style={{ paddingTop: 4 }}>
                <Meta
                  avatar={
                    <Tooltip
                      align={{ offset: [18, -3] }}
                      title={
                        isFriend ? (
                          <FormattedMessage
                            id="search.results.cards.connection.tooltip"
                            values={{ name: person.firstName }}
                          />
                        ) : undefined
                      }
                    >
                      <Badge
                        count={
                          isFriend ? (
                            <TeamOutlined style={{ color: "#F5F5F5" }} />
                          ) : undefined
                        }
                        offset={[-6, 6]}
                        style={{
                          backgroundColor: "#565656",
                          borderRadius: 20,
                          padding: 4,
                        }}
                      >
                        <Avatar
                          size={48}
                          style={{
                            backgroundColor: person.avatarColor,
                          }}
                        >
                          <Text style={{ fontSize: "25px", color: "white" }}>
                            {person.nameInitials}
                          </Text>
                        </Avatar>
                      </Badge>
                    </Tooltip>
                  }
                  title={`${person.firstName} ${person.lastName}`}
                  description={
                    <p style={styles.smallP}>
                      {person.jobTitle ? person.jobTitle : "-"}
                    </p>
                  }
                  style={{ margin: 0, marginRight: 20 }}
                />
              </Row>
            </Col>

            {person.resultSkills.length > 0 && (
              <Divider
                type="vertical"
                style={{ height: "auto", marginRight: 20, marginTop: 4 }}
              />
            )}

            <Col flex="1">
              {person.resultSkills.length > 0 && (
                <Row align="middle" style={{ height: "100%" }} type="flex">
                  {person.resultSkills.map(({ id, name }) => (
                    <Col>
                      <Tag
                        style={{
                          marginBottom: "2px",
                          marginTop: "2px",
                        }}
                        key={id}
                      >
                        {name}
                      </Tag>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    );
  };

  const renderResultCards = (dataSource) => {
    if (!loading && dataSource.length === 0) {
      return (
        <Empty description={<FormattedMessage id="search.no.results" />} />
      );
    }

    const preparedResults = prepareInfo(dataSource, locale);

    return preparedResults.map((person, key) => renderCard(person, key));
  };

  return (
    <div style={{ padding: "0 12px", maxWidth: 1500 }}>
      {loading && (
        <Card>
          <Skeleton />
        </Card>
      )}
      <Row
        gutter={[8, 8]}
        type="flex"
        justify="left"
        align={results.length === 0 ? "center" : "top"}
      >
        {!loading && renderResultCards(results)}
      </Row>
    </div>
  );
};

ResultsCardView.propTypes = {
  history: HistoryPropType.isRequired,
  results: PropTypes.arrayOf(ProfileInfoPropType),
  locale: PropTypes.oneOf(["FRENCH", "ENGLISH"]).isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  connections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ResultsCardView.defaultProps = {
  results: [],
};

export default ResultsCardView;
