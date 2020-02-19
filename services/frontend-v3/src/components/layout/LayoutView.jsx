import React from "react";
import { Layout } from "antd";

const { Sider, Header, Content, Footer } = Layout;

export default class LayoutView extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>{this.props.children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
