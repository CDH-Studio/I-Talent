import {
  Row,
  Col,
  Typography,
  Form,
  Select,
  Button,
  Tooltip,
  Input,
} from "antd";

import { FormOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  FieldPropType,
  KeyTitleOptionsPropType,
  // IntlPropType,
} from "../../../../utils/customPropTypes";
import filterOption from "../../../../functions/filterSelectInput";

import "./QualifiedPoolsFormView.less";

const { Option } = Select;
const { Title } = Typography;

/**
 *  QualifiedPoolsFormView(props)
 *  This component renders the qualified pools form.
 *  It is rendered when a user generates an qualified pool item
 *  It contains classification, job title, selection process number and link to job poster.
 */
const QualifiedPoolsFormView = ({
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => {
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    url: {
      type: "url",
      message: <FormattedMessage id="profile.rules.url" />,
    },
  };

  return (
    <div className="formItem">
      <Row gutter={24} className="gutter-row titleRow">
        <Col className="titleCol" xs={24} md={24} lg={24} xl={24}>
          <Title level={4} className="entryTitle">
            <Row align="middle" justify="space-between">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="profile.qualified.pools" />
                {`: ${fieldElement.name + 1}`}
              </Col>
              <Tooltip
                placement="top"
                title={<FormattedMessage id="admin.delete" />}
              >
                <Button
                  type="link"
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    removeElement(fieldElement.name);
                  }}
                  size="small"
                  className="deleteButton"
                />
              </Tooltip>
            </Row>
          </Title>
        </Col>
      </Row>
      <Row gutter={24} className="gutter-row contentRow">
        <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
          {/* Classification Dropdown */}
          <Form.Item
            name={[fieldElement.name, "classificationId"]}
            fieldKey={[fieldElement.fieldKey, "classificationId"]}
            label={<FormattedMessage id="profile.classification" />}
            rules={[Rules.required]}
          >
            <Select
              showSearch
              placeholder={<FormattedMessage id="setup.select" />}
              allowClear
              filterOption={filterOption}
            >
              {classificationOptions.map((value) => {
                return <Option key={value.id}>{value.name}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
          <Form.Item
            name={[fieldElement.name, "jobTitle"]}
            fieldKey={[fieldElement.fieldKey, "jobTitle"]}
            label={<FormattedMessage id="profile.qualified.pools.job.title" />}
            rules={[Rules.required]}
            value={
              savedQualifiedPools[fieldElement.fieldKey] &&
              savedQualifiedPools[fieldElement.fieldKey].description
            }
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
          <Form.Item
            name={[fieldElement.name, "jobPosterLink"]}
            label={
              <FormattedMessage id="profile.qualified.pools.job.poster.link" />
            }
            rules={[Rules.required, Rules.url]}
            fieldKey={[fieldElement.fieldKey, "jobPosterLink"]}
            value={
              savedQualifiedPools[fieldElement.fieldKey] &&
              savedQualifiedPools[fieldElement.fieldKey].description
            }
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
          <Form.Item
            name={[fieldElement.name, "selectionProcessNumber"]}
            fieldKey={[fieldElement.fieldKey, "selectionProcessNumber"]}
            label={
              <FormattedMessage id="profile.qualified.pools.selection.process.number" />
            }
            rules={[Rules.required]}
            value={
              savedQualifiedPools[fieldElement.fieldKey] &&
              savedQualifiedPools[fieldElement.fieldKey].description
            }
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

QualifiedPoolsFormView.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
      jobPosterLink: PropTypes.string,
    })
  ).isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
};

export default injectIntl(QualifiedPoolsFormView);
