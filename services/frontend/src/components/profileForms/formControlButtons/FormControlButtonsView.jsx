import React from "react";
import { Row, Col, Button } from "antd";
import {
  CheckOutlined,
  ClearOutlined,
  RightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import "./FormControlButtonsView.less";

const FormControlButtonsView = ({
  edit,
  create,
  onSave,
  onSaveAndNext,
  onSaveAndFinish,
  onReset,
  onFinish,
  fieldsChanged,
}) => {
  const firstButtonContent = () =>
    create ? (
      <>
        <CheckOutlined />
        <span>
          <FormattedMessage id="setup.save.and.finish" />
        </span>
      </>
    ) : (
      <>
        <SaveOutlined />
        <span>
          <FormattedMessage id="setup.save" />
        </span>
      </>
    );

  const lastButtonOnClick = () => {
    if (create) {
      if (onSaveAndNext) {
        onSaveAndNext();
      } else {
        onSaveAndFinish();
      }
    } else if (fieldsChanged) {
      onSaveAndFinish();
    } else {
      onFinish();
    }
  };

  const lastButtonContent = () =>
    create ? (
      <>
        <span>
          {onSaveAndNext ? (
            <FormattedMessage id="setup.save.and.next" />
          ) : (
            <FormattedMessage id="setup.save.and.finish" />
          )}
        </span>
        <RightOutlined />
      </>
    ) : (
      <>
        <CheckOutlined />
        <span>
          {fieldsChanged ? (
            <FormattedMessage id="setup.save.and.finish" />
          ) : (
            <FormattedMessage id="button.finish" />
          )}
        </span>
      </>
    );

  return (
    <Row gutter={[24, 14]} className="fcb-container">
      <Col xs={24} md={24} lg={18} xl={18}>
        {(edit || onSaveAndNext) && (
          <Button
            className="fcb-finishAndSaveBtn"
            onClick={create ? onSaveAndFinish : onSave}
            htmlType="button"
            disabled={edit && !fieldsChanged}
          >
            {firstButtonContent()}
          </Button>
        )}
        <Button
          className="fcb-clearBtn"
          htmlType="button"
          onClick={onReset}
          danger
          disabled={!fieldsChanged}
        >
          <ClearOutlined />
          <span>
            <FormattedMessage id="button.clear" />
          </span>
        </Button>
      </Col>
      <Col xs={24} md={24} lg={6} xl={6}>
        <Button
          className="fcb-saveBtn"
          type="primary"
          onClick={lastButtonOnClick}
        >
          {lastButtonContent()}
        </Button>
      </Col>
    </Row>
  );
};

FormControlButtonsView.propTypes = {
  edit: PropTypes.bool.isRequired,
  create: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func,
  onSaveAndFinish: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  fieldsChanged: PropTypes.bool.isRequired,
};

FormControlButtonsView.defaultProps = {
  onSaveAndNext: undefined,
};

export default FormControlButtonsView;
