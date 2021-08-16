import "./QualifiedPoolsFormView.less";

import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl, useIntl } from "react-intl";

import filterOption from "../../../../functions/filterSelectInput";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";
import CustomDropdown from "../../../formItems/CustomDropdown";

const { Title } = Typography;

/**
 *  QualifiedPoolsFormView(props)
 *  This component renders the qualified pools form.
 *  It is rendered when a user generates an qualified pool item
 *  It contains classification, job title, selection process number and link to job poster.
 */
const QualifiedPoolsFormView = ({
  form,
  fieldElement,
  removeElement,
  savedQualifiedPools,
  classificationOptions,
}) => {
  const intl = useIntl();

  const Rules = {
    required: {
      message: <FormattedMessage id="rules.required" />,
      required: true,
    },
    url: {
      message: <FormattedMessage id="rules.url" />,
      type: "url",
    },
  };

  return (
    <div className="pool-formItem">
      <Row className="gutter-row titleRow" gutter={24}>
        <Col className="titleCol" lg={24} md={24} xl={24} xs={24}>
          <Title className="entryTitle" level={4}>
            <Row align="middle" justify="space-between">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="qualified.pools" />
                {`: ${fieldElement.name + 1}`}
              </Col>
              <Tooltip placement="top" title={<FormattedMessage id="delete" />}>
                <Button
                  className="deleteButton"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    removeElement(fieldElement.name);
                  }}
                  shape="circle"
                  size="small"
                  type="link"
                />
              </Tooltip>
            </Row>
          </Title>
        </Col>
      </Row>
      <Row className="gutter-row contentRow" gutter={24}>
        <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
          {/* Classification Dropdown */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "classificationId"]}
            label={<FormattedMessage id="classification" />}
            name={[fieldElement.name, "classificationId"]}
            rules={[Rules.required]}
          >
            <CustomDropdown
              ariaLabel={intl.formatMessage({
                id: "classification",
              })}
              initialValueId={form.getFieldValue([
                "qualifiedPools",
                fieldElement.fieldKey,
                "classificationId",
              ])}
              placeholderText={<FormattedMessage id="select" />}
              options={classificationOptions}
              isRequired
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "jobTitle"]}
            label={<FormattedMessage id="job.title.department" />}
            name={[fieldElement.name, "jobTitle"]}
            rules={[Rules.required]}
            value={
              savedQualifiedPools[fieldElement.fieldKey] &&
              savedQualifiedPools[fieldElement.fieldKey].description
            }
          >
            <Input
              placeholder={intl.formatMessage({
                id: "job.title.department.placeholder",
              })}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "jobPosterLink"]}
            label={<FormattedMessage id="qualified.pools.job.poster.link" />}
            name={[fieldElement.name, "jobPosterLink"]}
            rules={[Rules.url]}
            value={
              savedQualifiedPools[fieldElement.fieldKey] &&
              savedQualifiedPools[fieldElement.fieldKey].description
            }
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "selectionProcessNumber"]}
            label={
              <FormattedMessage id="qualified.pools.selection.process.number" />
            }
            name={[fieldElement.name, "selectionProcessNumber"]}
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
  form: FormInstancePropType.isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      jobPosterLink: PropTypes.string,
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
    })
  ).isRequired,
};

export default QualifiedPoolsFormView;
