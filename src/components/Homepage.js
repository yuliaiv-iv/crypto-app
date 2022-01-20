import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from ".";
import Loader from "./Loader";
import { Button, Container, Row, Col } from "react-bootstrap";

const Homepage = () => {
  // reduct provides a isFetching state
  const { data, isFetching } = useGetCryptosQuery(12);

  if (isFetching) return <Loader />;

  const globalStats = data?.data?.stats;

  const stats = [
    {
      title: "Total Crypto Currencies",
      number: `${millify(globalStats.total)}`,
    },
    {
      title: "Total Exchanges",
      number: `${millify(globalStats.totalExchanges)}`,
    },
    {
      title: "Total Market Cap",
      number: `$ ${millify(globalStats.totalMarketCap)}`,
    },
    {
      title: "Total 24h Volume",
      number: `$ ${millify(globalStats.total24hVolume)}`,
    },
    {
      title: "Total Markets",
      number: `${millify(globalStats.totalMarkets)}`,
    },
  ];

  return (
    <Container className="my-5">
      <h1>Global Crypto Statistic</h1>
      <Row className="my-5">
        {stats.map(({ title, number }) => (
          <Col sm={6} key={title} className="mb-3">
            <h6>{title}</h6>
            <h5>{number}</h5>
          </Col>
        ))}
      </Row>
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
