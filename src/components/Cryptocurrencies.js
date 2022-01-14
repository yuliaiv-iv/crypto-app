import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Row, Col, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 12: 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(cryptosList)

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
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={handleSearch} />
        </div>
      )}
      <Row justify="center" gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
