import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { format, addMinutes, parse } from "date-fns";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #ffffff;
  margin-bottom: 20px;
`;

const Price = styled.div`
  font-size: 24px;
  line-height: 24px;
  color: #2196f3;
  height: 100%;
  display: flex;
  align-items: center;
`;

const GreyDiv = styled.div`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.5px;
  color: #a0b0b9;
`;

const BlackDiv = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #4a4a4a;
`;
const getTime = (date) => {
  return format(date, "HH:mm").toString();
};

const formatDate = (date) => {
  return parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date());
};

const durationHours = (time) => {
  return Math.trunc(time / 60);
};

const durationMinute = (time) => {
  return Math.trunc(time % 60);
};

const normalizeStops = (stops) => {
  switch (stops) {
    case 0:
      return `${stops} ПЕРЕСАДОК`;
    case 1:
      return `${stops} ПЕРЕСАДКА`;
    default:
      return `${stops} ПЕРЕСАДКИ`;
  }
};

const ticket = ({ price, carrier, segments }) => {
  const forward = segments[0];
  const backward = segments[1];

  return (
    <Wrapper>
      <Row gutter={[0, 20]}>
        <Col span={16}>
          <Price>{price} Р</Price>
        </Col>
        <Col span={8}>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="company_logo" />
        </Col>
      </Row>
      <Row gutter={[0, 10]}>
        <Col span={8}>
          <GreyDiv>
            {forward.origin} - {forward.destination}
          </GreyDiv>
          <BlackDiv>
            {`${getTime(formatDate(forward.date))} - ${getTime(
              addMinutes(formatDate(forward.date), forward.duration)
            )}`}
          </BlackDiv>
        </Col>
        <Col span={8}>
          <GreyDiv>В ПУТИ</GreyDiv>
          <BlackDiv>
            {durationHours(forward.duration)}ч{" "}
            {durationMinute(forward.duration)}м
          </BlackDiv>
        </Col>
        <Col span={8}>
          <GreyDiv>{normalizeStops(forward.stops.length)}</GreyDiv>
          <BlackDiv>{forward.stops.map((town) => `${town} `)}</BlackDiv>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <GreyDiv>
            {backward.origin} - {backward.destination}
          </GreyDiv>
          <BlackDiv>
            {`${getTime(formatDate(backward.date))} - ${getTime(
              addMinutes(formatDate(backward.date), backward.duration)
            )}`}
          </BlackDiv>
        </Col>
        <Col span={8}>
          <GreyDiv>В ПУТИ</GreyDiv>
          <BlackDiv>
            {durationHours(backward.duration)}ч{" "}
            {durationMinute(backward.duration)}м
          </BlackDiv>
        </Col>
        <Col span={8}>
          <GreyDiv>{normalizeStops(backward.stops.length)}</GreyDiv>
          <BlackDiv>{backward.stops.map((town) => `${town} `)}</BlackDiv>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ticket;

ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    {
      origin: PropTypes.string,
      destination: PropTypes.string,
      date: PropTypes.string,
      stops: PropTypes.arrayOf(PropTypes.string),
      duration: PropTypes.number,
    },
    {
      origin: PropTypes.string,
      destination: PropTypes.string,
      date: PropTypes.string,
      stops: PropTypes.arrayOf(PropTypes.string),
      duration: PropTypes.number,
    }
  ).isRequired,
};
