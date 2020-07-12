import React from "react";
import "./filter.scss";
import { Checkbox } from "antd";
import PropTypes from "prop-types";

export default class Filter extends React.Component {
  onChange = (checkedValue) => {
    const { changeFilter } = this.props;
    changeFilter(checkedValue);
  };

  render() {
    const { filter } = this.props;
    return (
      <Checkbox.Group
        className="myCheckbox"
        onChange={this.onChange}
        value={filter}
      >
        <span className="myCheckbox_title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <Checkbox className="myCheckbox_input" value="all">
          Все
        </Checkbox>
        <Checkbox className="myCheckbox_input" value="0">
          Без пересадок
        </Checkbox>
        <Checkbox className="myCheckbox_input" value="1">
          1 пересадка
        </Checkbox>
        <Checkbox className="myCheckbox_input" value="2">
          2 пересадки
        </Checkbox>
        <Checkbox className="myCheckbox_input" value="3">
          3 пересадки
        </Checkbox>
      </Checkbox.Group>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.String).isRequired,
  changeFilter: PropTypes.func.isRequired,
};
