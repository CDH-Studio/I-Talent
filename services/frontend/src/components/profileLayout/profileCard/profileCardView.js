import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import EditWrapperController from "../editWrapper/editWrapperController";
import "./profileCard.css";

/** UI for displaying a profile card */
export default class profileCardView extends Component {
  render() {
    const {
      cardIcon,
      cardName,
      children,
      className,
      editOptionPaths,
      form,
      formName,
      fullHeight,
      id,
      wrapperType
    } = this.props;

    const heightStyle = fullHeight ? { height: "100%" } : {};

    return (
      <EditWrapperController
        form={form}
        formName={formName}
        editOptionPaths={editOptionPaths}
        style={heightStyle}
        wrapperType={wrapperType}
      >
        <Card
          className={className ? className + " profileCard" : "profileCard"}
          fluid
          id={id}
          style={heightStyle}
        >
          <Card.Header style={{ padding: "0px" }}>
            {cardName && (
              <h3
                className="blueColoredText"
                style={{ fontSize: "25px", color: "#fff", paddingLeft: "15px" }}
              >
                {cardName} {cardIcon}
              </h3>
            )}
          </Card.Header>
          <Card.Content>{children}</Card.Content>
        </Card>
      </EditWrapperController>
    );
  }
}
