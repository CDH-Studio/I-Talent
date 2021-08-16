import { FormattedMessage } from "react-intl";
import { Col, List, Row, Tag } from "antd";
import PropTypes from "prop-types";

const CareerInterestsView = ({
  interestedInRemote,
  lookingJob,
  relocationLocations,
}) => {
  const getCareerInterestsInfo = () => {
    const items = [];

    let description = "-";
    if (interestedInRemote) {
      description = <FormattedMessage id="yes" />;
    } else if (interestedInRemote === false) {
      description = <FormattedMessage id="no" />;
    }

    items.push(
      {
        description,
        title: <FormattedMessage id="interested.in.remote" />,
      },
      {
        description: (lookingJob && lookingJob.description) || "-",
        title: <FormattedMessage id="looking.for.new.job" />,
      }
    );

    if (relocationLocations && relocationLocations.length > 0) {
      items.push({
        render: (
          <div style={{ marginTop: 7 }}>
            {relocationLocations.map(({ id, city, province }) => (
              <Tag key={id} color="#727272">
                {city}, {province}
              </Tag>
            ))}
          </div>
        ),
        title: <FormattedMessage id="willing.to.relocate.to" />,
      });
    }

    return items;
  };

  return (
    <Row>
      <Col span={24}>
        <List
          dataSource={getCareerInterestsInfo()}
          itemLayout="horizontal"
          renderItem={({ title, description, render }) => (
            <List.Item>
              <Col span={24}>
                <List.Item.Meta description={description} title={title} />
                {render}
              </Col>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

CareerInterestsView.propTypes = {
  interestedInRemote: PropTypes.bool,
  lookingJob: PropTypes.shape({
    description: PropTypes.string,
  }),
  relocationLocations: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      id: PropTypes.string,
      province: PropTypes.string,
    })
  ),
};

CareerInterestsView.defaultProps = {
  interestedInRemote: undefined,
  lookingJob: undefined,
  relocationLocations: [],
};

export default CareerInterestsView;
