import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ticket from "./ticket";

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((response) => this.getTickets(response.data.searchId));
  }

  getTickets = async (searchId) => {
    const { tickets } = this.state;
    const url = new URL("https://front-test.beta.aviasales.ru/tickets");
    url.searchParams.append("searchId", `${searchId}`);
    try {
      const response = await axios.get(url);
      const { stop } = response.data;
      this.setState({ tickets: [...tickets, ...response.data.tickets] });
      if (!stop) this.getTickets(searchId);
    } catch {
      this.getTickets(searchId);
    }
  };

  sortByPrice = (first, second) => {
    return first.price - second.price;
  };

  sortByTime = (first, second) => {
    const firstDuration =
      first.segments[0].duration + first.segments[1].duration;
    const secondDuration =
      second.segments[0].duration + second.segments[1].duration;
    return firstDuration - secondDuration;
  };

  countMaxStops = (currTicket) => {
    const thereStops = currTicket.segments[0].stops.length;
    const backStops = currTicket.segments[1].stops.length;
    return thereStops > backStops ? thereStops : backStops;
  };

  isCheckedFilter = (stops) => {
    const { filter } = this.props;
    if (filter.includes("all")) return true;
    return filter.includes(stops.toString());
  };

  renderTickets = () => {
    const { tickets } = this.state;
    const { sortBy } = this.props;
    if (tickets.length === 0) return;
    const result = tickets.filter((tick) =>
      this.isCheckedFilter(this.countMaxStops(tick))
    );
    if (sortBy === "cost") {
      result.sort(this.sortByPrice);
    } else {
      result.sort(this.sortByTime);
    }
    return result.slice(0, 5).map((tick) => ticket(tick));
  };

  render() {
    return <>{this.renderTickets()}</>;
  }
}

Tickets.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortBy: PropTypes.string.isRequired,
};
