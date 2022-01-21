import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Row, Col, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(data?.data?.coins);

    const filteredData = data?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [data, searchTerm]);

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  if (isFetching) return <Loader />;

  return (
    <Container className="my-5">
      <h1>Top 12 Cryptos In The World</h1>
      {!simplified && (
        <Form.Control
          size="lg"
          placeholder="Search Cryptocurrency"
          onChange={handleSearch}
        />
      )}
      <Row className="my-5">
        {cryptos?.length === 0 ? (
          <h5>Nothing matched your search terms</h5>
        ) : (
          cryptos?.map((currency) => (
            <Col md={4} lg={3} sm={6} className="my-3" key={currency.uuid}>
              <Card className="card-link">
                <Link to={`/crypto/${currency.uuid}`}>
                  <Card.Header bsPrefix="card-header">
                    <Card.Title>{`${currency.rank}. ${currency.name}`}</Card.Title>
                    <Card.Img
                      bsPrefix="card-img"
                      alt={currency.name}
                      src={currency.iconUrl}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>Price: {millify(currency.price)}</Card.Text>
                    <Card.Text>Cap: {millify(currency.marketCap)}</Card.Text>
                    <Card.Text>Daily Change: {currency.change}%</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Cryptocurrencies;
