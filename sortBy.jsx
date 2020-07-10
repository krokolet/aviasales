import React from "react";
import styled from "styled-components";
import { Row } from "antd";
import PropTypes from "prop-types";

const Button = styled.button`
  width: 252px;
  height: 50px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  border: 1px solid #dfe5ec;
  background-color: ${(props) => (props.active ? "#2196F3" : "#FFFFFF")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#4A4A4A")};
  margin-bottom: 20px;
`;
const LeftButton = styled(Button)`
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-right: none;
`;
const RightButton = styled(Button)`
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  border-left: none;
`;

export default class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  changeSortBy = (value) => (event) => {
    event.preventDefault();
    const { changeSort } = this.props;
    changeSort(value);
  };

  render() {
    const { sortBy } = this.props;
    return (
      <Row>
        <LeftButton
          onClick={this.changeSortBy("cost")}
          active={sortBy === "cost"}
        >
          САМЫЙ ДЕШЁВЫЙ
        </LeftButton>
        <RightButton
          onClick={this.changeSortBy("speed")}
          active={sortBy === "speed"}
        >
          САМЫЙ БЫСТРЫЙ
        </RightButton>
      </Row>
    );
  }
}

SortBy.propTypes = {
  sortBy: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};
