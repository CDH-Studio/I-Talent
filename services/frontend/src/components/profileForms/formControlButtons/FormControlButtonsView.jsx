import { useState } from "react";
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
import VisibilityConfirmation from "../../visibilityConfirmation/VisibilityConfirmation";

const FormControlButtonsView = ({
  edit,
  create,
  onSave,
  onSaveAndNext,
  onSaveAndFinish,
  onReset,
  onFinish,
  fieldsChanged,
  visibleCards,
}) => {
  console.log("ONFINISH", typeof onFinish);

  const [finish, setFinish] = useState(false);
  const [modalFunc, setModalFunc] = useState(null);

  const firstButtonOnClick = () => {
    if (create) {
      setFinish(true);
      setModalFunc(() => () => onSaveAndFinish());
    } else {
      onSave();
    }
  };

  const firstButtonContent = () =>
    create ? (
      <>
        <CheckOutlined />
        <span>
          <FormattedMessage id="save.and.finish" />
        </span>
      </>
    ) : (
      <>
        <SaveOutlined />
        <span>
          <FormattedMessage id="save" />
        </span>
      </>
    );

  const lastButtonOnClick = () => {
    if (create) {
      if (onSaveAndNext) {
        onSaveAndNext();
      } else {
        setFinish(true);
        setModalFunc(() => () => onSaveAndFinish());
      }
    } else if (fieldsChanged) {
      setFinish(true);
      setModalFunc(() => () => onSaveAndFinish());
    } else {
      setFinish(true);
      setModalFunc(() => () => onFinish());
    }
  };

  const lastButtonContent = () =>
    create ? (
      <>
        <span>
          {onSaveAndNext ? (
            <FormattedMessage id="save.and.next" />
          ) : (
            <FormattedMessage id="save.and.finish" />
          )}
        </span>
        <RightOutlined />
      </>
    ) : (
      <>
        <CheckOutlined />
        <span>
          {fieldsChanged ? (
            <FormattedMessage id="save.and.finish" />
          ) : (
            <FormattedMessage id="button.finish" />
          )}
        </span>
      </>
    );

  const onCloseModal = () => setFinish(false);

  return (
    <>
      <VisibilityConfirmation
        visibleCards={visibleCards}
        visible={finish}
        onOk={modalFunc}
        onCloseModal={onCloseModal}
      />
      <Row gutter={[24, 14]} className="fcb-container">
        <Col xs={24} md={24} lg={18} xl={18}>
          {(edit || onSaveAndNext) && (
            <Button
              className="fcb-finishAndSaveBtn"
              onClick={firstButtonOnClick}
              htmlType="button"
              disabled={edit && !fieldsChanged}
            >
              {firstButtonContent()}
            </Button>
          )}
          <Button
            className="fcb-finishAndSaveBtn"
            htmlType="button"
            onClick={onReset}
            danger
            disabled={!fieldsChanged}
          >
            <ClearOutlined />
            <span>
              <FormattedMessage id="clear.changes" />
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
    </>
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
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ).isRequired,
};

FormControlButtonsView.defaultProps = {
  onSaveAndNext: undefined,
};

export default FormControlButtonsView;
