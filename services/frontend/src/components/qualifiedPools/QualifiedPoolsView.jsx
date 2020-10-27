import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Row, Col, List, Empty, Descriptions, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Link } = Typography;

const QualifiedPoolsView = ({ qualifiedPoolsInfo }) => {

    const generateQualifiedPoolsInfoList = (dataSource) => {
        return (
            <List
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={(item) => (
                    <List.Item>
                        <Descriptions>
                            <Descriptions.Item>{item.classification}</Descriptions.Item>
                            <Descriptions.Item>{item.jobTitle}</Descriptions.Item>
                            <Descriptions.Item>
                                <Link href={item.jobPosterLink} target="_blank">
                                    <LinkOutlined />{item.selectionProcessNumber}
                                </Link>
                            </Descriptions.Item>
                        </Descriptions>
                    </List.Item>
                )}
            />
        );
    };

    if (qualifiedPoolsInfo.length > 0) {
        return (
            <Row>
                <Col xs={24} lg={24}>
                    {generateQualifiedPoolsInfoList(qualifiedPoolsInfo)}
                </Col>
            </Row>
        );
    }
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<FormattedMessage id="profile.qualified.empty" />}
        />
    );
};

QualifiedPoolsView.propTypes = {
    qualifiedPoolsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            classification: PropTypes.string
        })
    ).isRequired,
};

export default QualifiedPoolsView;
