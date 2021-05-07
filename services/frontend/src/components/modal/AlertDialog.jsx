import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Button } from "antd";

const AlertDialog = ({
  title,
  body,
  isOpen,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => (
  <div>
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button onClick={onOk} type="primary" autoFocus>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

AlertDialog.propTypes = {
  title: PropTypes.element.isRequired,
  body: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  okText: PropTypes.element.isRequired,
  cancelText: PropTypes.element.isRequired,
};

export default AlertDialog;
