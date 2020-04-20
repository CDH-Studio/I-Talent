import React, { Component } from "react";
import AdminMenu from "./AdminMenu";
import {
  Table,
  Modal,
  Header,
  Button,
  Icon,
  Input,
  Form,
  Pagination,
  Checkbox,
} from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";
import { FormattedMessage, injectIntl } from "react-intl";

import config from "../../config";
const { backendAddress } = config;

const ELEMENT_PER_PAGE = 10;

class AdminOptionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      column: null,
      allData: null,
      data: null,
      direction: null,
      id: null,
      modal: null,
      loading: true,
      english: null,
      french: null,
      deleteValues: [],
      activePage: 1,
    };
  }

  componentDidMount() {
    document.title = this.getDisplayType(true) + " - Admin | I-Talent";
    this.setState({ loading: true });
    axios
      .get(backendAddress + "api/admin/options/" + this.state.type)
      .then((res) =>
        this.setState({
          allData: res.data,
          data: _.sortBy(res.data, ["descriptionEn"]),
          loading: false,
          column: "english",
          direction: "ascending",
        })
      );
  }

  getDisplayType = (plural) => {
    if (plural)
      return this.props.intl.formatMessage({
        id: "admin." + this.state.type + ".plural",
        defaultMessage: this.state.type,
      });

    return this.props.intl.formatMessage({
      id: "admin." + this.state.type + ".singular",
      defaultMessage: this.state.type,
    });
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;

    const dbAttributes = { english: "descriptionEn", french: "descriptionFr" };

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [dbAttributes[clickedColumn]]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  handleEditChange = (e, { name, value }) => this.setState({ [name]: value });

  handleCheckbox = (id) => {
    this.setState(({ deleteValues }) => {
      deleteValues = _.xor(deleteValues, [id]);
      return { deleteValues };
    });
  };

  handleFilter = (e, { value }) => {
    const newData = this.state.allData.filter(
      (option) =>
        (option.descriptionEn &&
          option.descriptionEn
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )) ||
        (option.descriptionFr &&
          option.descriptionFr
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            ))
    );

    const dbAttributes = { english: "descriptionEn", french: "descriptionFr" };

    this.setState({
      data: _.sortBy(newData, [dbAttributes[this.state.column]]),
      activePage: 1,
    });
  };

  handleClick = (type, id, en, fr) => {
    this.setState({ id: id, modal: type, english: en, french: fr });
  };

  handleSubmitEdit = () => {
    const { type, id, english, french } = this.state;

    const url = backendAddress + "api/admin/options/" + type + "/" + id;
    axios
      .put(url, { descriptionEn: english, descriptionFr: french })
      .then(() => {
        this.setState({ id: null, english: null, french: null, modal: null });
        window.location.reload();
      });
  };

  handleSubmitDelete = () => {
    const { type, deleteValues } = this.state;

    const url = backendAddress + "api/admin/delete/" + type;
    axios.post(url, { ids: deleteValues }).then(() => {
      this.setState({
        deleteValues: [],
        english: null,
        french: null,
        modal: null,
      });
      window.location.reload();
    });
  };

  handleSubmitAdd = () => {
    const { type, english, french } = this.state;

    const url = backendAddress + "api/admin/options/" + type;
    axios
      .post(url, { descriptionEn: english, descriptionFr: french })
      .then(() => {
        this.setState({ id: null, english: null, french: null, modal: null });
        window.location.reload();
      });
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  renderEditButton = (id, en, fr) => {
    return (
      <center>
        <Icon
          color="blue"
          onClick={() => this.handleClick("edit", id, en, fr)}
          name="pencil"
        />
      </center>
    );
  };

  editModal = () => {
    const { modal, english, french } = this.state;
    return (
      <Modal
        size="small"
        open={modal === "edit"}
        onClose={() => this.setState({ id: null, modal: null })}
        dimmer="blurring"
        closeIcon
      >
        <Header content={"Edit " + this.getDisplayType(false)} as="h2" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>English</label>
              <Input
                placeholder="English"
                name="english"
                value={english}
                onChange={this.handleEditChange}
              />
            </Form.Field>
            <Form.Field>
              <label>French</label>
              <Input
                placeholder="French"
                name="french"
                value={french}
                onChange={this.handleEditChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            inverted
            onClick={() => this.setState({ modal: null })}
          >
            <Icon name="remove" />
            <FormattedMessage id="admin.cancel" />
          </Button>
          <Button color="green" onClick={this.handleSubmitEdit}>
            <Icon name="checkmark" /> <FormattedMessage id="admin.apply" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  deleteModal = () => {
    const { modal } = this.state;

    return (
      <Modal
        size="small"
        open={modal === "delete"}
        onClose={() => this.setState({ id: null, modal: null })}
        dimmer="blurring"
        closeIcon
      >
        <Header content={"Delete " + this.getDisplayType(false)} as="h2" />
        <Modal.Content>
          <h5>Are you sure you want to delete all the selected values?</h5>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="red"
            floated="right"
            onClick={this.handleSubmitDelete}
            style={{ marginTop: "18px", marginBottom: "18px" }}
          >
            <Icon name="trash" /> <FormattedMessage id="admin.delete" />
          </Button>
          <Button
            color="red"
            inverted
            floated="right"
            onClick={() => this.setState({ modal: null })}
            style={{ marginTop: "18px", marginBottom: "18px" }}
          >
            <Icon name="remove" />
            <FormattedMessage id="admin.cancel" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  addModal = () => {
    const { modal, english, french } = this.state;
    return (
      <Modal
        size="small"
        open={modal === "add"}
        onClose={() => this.setState({ id: null, modal: null })}
        dimmer="blurring"
        closeIcon
      >
        <Header content={"Add " + this.getDisplayType(false)} as="h2" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>English</label>
              <Input
                placeholder="English"
                name="english"
                value={english}
                onChange={this.handleEditChange}
              />
            </Form.Field>
            <Form.Field>
              <label>French</label>
              <Input
                placeholder="French"
                name="french"
                value={french}
                onChange={this.handleEditChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            inverted
            onClick={() => this.setState({ modal: null })}
          >
            <Icon name="remove" />
            <FormattedMessage id="admin.cancel" />
          </Button>
          <Button color="green" onClick={this.handleSubmitAdd}>
            <Icon name="add" />
            <FormattedMessage id="admin.add" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  generateTable = (column, direction, pageData) => {
    return (
      <Table sortable celled fixed striped color="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell
              sorted={column === "english" ? direction : null}
              onClick={this.handleSort("english")}
            >
              <FormattedMessage id="language.english" />
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "french" ? direction : null}
              onClick={this.handleSort("french")}
            >
              <FormattedMessage id="language.french" />
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">
              <FormattedMessage id="admin.editHeader" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(pageData, ({ id, descriptionEn, descriptionFr }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <center>
                  <Checkbox
                    onClick={() => this.handleCheckbox(id)}
                    checked={this.state.deleteValues.includes(id)}
                  />
                </center>
              </Table.Cell>
              <Table.Cell>{descriptionEn}</Table.Cell>
              <Table.Cell>{descriptionFr}</Table.Cell>
              <Table.Cell>
                {this.renderEditButton(id, descriptionEn, descriptionFr)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~RENDER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  render() {
    const {
      type,
      column,
      data,
      direction,
      loading,
      activePage,
      deleteValues,
    } = this.state;
    const { changeLanguage, keycloak } = this.props;

    let totalPages = 0;
    if (data) totalPages = Math.ceil(data.length / ELEMENT_PER_PAGE);

    const dataStart = ELEMENT_PER_PAGE * (activePage - 1);
    const dataEnd = dataStart + ELEMENT_PER_PAGE;

    const pageData = _.slice(data, dataStart, dataEnd);

    return (
      <AdminMenu
        active={type}
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        loading={loading}
        goto={this.props.goto}
      >
        {this.editModal()}
        {this.deleteModal()}
        {this.addModal()}

        <Header as="h1">{this.getDisplayType(true)}</Header>

        <Input onChange={this.handleFilter} label="Filter" icon="filter" />
        <Button
          color="green"
          floated="right"
          onClick={() => this.handleClick("add")}
        >
          <Icon name="add" />
          <FormattedMessage id="admin.add" />
        </Button>
        <Button
          color="red"
          floated="right"
          onClick={() => this.handleClick("delete")}
          disabled={deleteValues.length === 0}
        >
          <Icon name="trash" />
          <FormattedMessage id="admin.delete" />
        </Button>

        {this.generateTable(column, direction, pageData)}

        <center>
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={this.handlePaginationChange}
            boundaryRange="2"
            siblingRange="2"
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true,
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true,
            }}
            prevItem={{
              content: <Icon name="angle left" />,
              icon: true,
            }}
            nextItem={{
              content: <Icon name="angle right" />,
              icon: true,
            }}
          />
        </center>
      </AdminMenu>
    );
  }
}

export default injectIntl(AdminOptionEdit);
