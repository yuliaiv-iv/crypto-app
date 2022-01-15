import React from "react";
import millify from "millify";
// import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from ".";
import Loader from "./Loader";
import { Button, Offcanvas, Container, Row, Col } from "react-bootstrap";

// const { Title } = Typography;

const Homepage = () => {
  // reduct provides a isFetching state
  const { data, isFetching } = useGetCryptosQuery(12);

  if (isFetching) return <Loader />;

  const globalStats = data?.data?.stats;

  return (
    <Container className="my-4">
      <h1>Global Crypto Statistic</h1>
      <Row className="my-5">
        <Col md={6}>
          <h4>Total Crypto Currencies</h4>
          <h3>{millify(globalStats.total)}</h3>
        </Col>
        <Col md={6}>
          <h4>Total Exchanges</h4>
          <h3>{millify(globalStats.totalExchanges)}</h3>
        </Col>
        <Col md={6}>
          <h4>Total Market Cap</h4>
          <h3>$ {millify(globalStats.totalMarketCap)}</h3>
        </Col>
        <Col md={6}>
          <h4>Total 24h Volume</h4>
          <h3>$ {millify(globalStats.total24hVolume)}</h3>
        </Col>
        <Col md={6}>
          <h4>Total Markets</h4>
          <h3>{millify(globalStats.totalMarkets)}</h3>
        </Col>
      </Row>
      <h1>Top 12 Cryptos In The World</h1>
      <Cryptocurrencies simplified />
      <Link to="/cryptocurrencies">
        <Button>Show more</Button>
      </Link>
      <News simplified />
      <Link to="/news">
        <Button>Show more</Button>
      </Link>
    </Container>
  );
};

export default Homepage;
