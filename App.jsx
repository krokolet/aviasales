import React from "react";
import "./App.scss";
import { Col, Row, Layout } from "antd";
import Tickets from "./tickets";
import logo from "./images/logo.png";
import Filter from "./filter";
import SortBy from "./sortBy";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ["all"],
      sortBy: "cost",
    };
  }

  changeFilter = (newFilter) => {
    const { filter } = this.state;
    if (newFilter.includes("all") && !filter.includes("all")) {
      this.setState({ filter: ["all"] });
      return;
    }
    this.setState({ filter: newFilter.filter((el) => el !== "all") });
  };

  sortBy = (value) => {
    const { sortBy } = this.state;
    if (sortBy === value) return;
    this.setState({ sortBy: value });
  };

  render() {
    const { filter, sortBy } = this.state;
    return (
      <Layout className="wrapper">
        <Header className="header">
          <img src={`${logo}`} alt="logo" />
        </Header>
        <Content className="contentStyle">
          <Row gutter={[20, 20]}>
            <Col>
              <Filter filter={filter} changeFilter={this.changeFilter} />
            </Col>
            <Col>
              <SortBy changeSort={this.sortBy} sortBy={sortBy} />
              <Tickets filter={filter} sortBy={sortBy} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
