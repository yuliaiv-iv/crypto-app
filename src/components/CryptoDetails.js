import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import {
  Card,
  Row,
  Col,
  Container,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import millify from "millify";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import Loader from "./Loader";

const CryptoDetails = () => {
  const [timeperiod, setTimeperiod] = useState("7d");
  let { id } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(id);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ id, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;
  const volume24h = cryptoDetails["24hVolume"];

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${millify(volume24h)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(avg)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  function insertHtml(content) {
    return (
      <Col>
        {content.map(({ icon, title, value }) => (
          <Card key={title} className="details">
            <ListGroup variant="flush">
              <ListGroup.Item className="info">
                <Col className="info-title" sm={8}>
                  {icon}
                  <p className="info-p">{title}</p>
                </Col>
                <Col>
                  <p className="info-p price">{value}</p>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </Col>
    );
  }

  return (
    <Container className="my-5">
      <h1>
        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
      </h1>
      <p>
        {cryptoDetails.name} live price in US Dollar (USD). View value
        statistics, market cap and supply.
      </p>
      <Dropdown>
        <Dropdown.Toggle className="drop-btn" id="dropdown-basic">
          {timeperiod}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {time.map((date, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => {
                setTimeperiod(date);
              }}
            >
              {date}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <Container className="my-5">
        <Row>
          <Col md={6} className="info-card">
            <h2 className="text-details">{cryptoDetails.name} Value</h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
            {insertHtml(stats)}
          </Col>
          <Col md={6} className="info-card">
            <h2 className="text-details">Other Stats Info</h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
            {insertHtml(genericStats)}
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <h2 className="text-details">What is {cryptoDetails.name}?</h2>
            {HTMLReactParser(cryptoDetails.description)}
          </Col>
          <Col md={6}>
            <h2 className="text-details">{cryptoDetails.name} Links</h2>
            {cryptoDetails.links?.map((link, i) => (
              <Card className="details" key={i}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="info">
                    <Col className="info-title" sm={6}>
                      <h6>
                        {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                      </h6>
                    </Col>
                    <Col className="link">
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.name}
                      </a>
                    </Col>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
    // <Select
    //   defaultValue="7d"
    //   className="select-timeperiod"
    //   placeholder="Select Timeperiod"
    //   onChange={(value) => setTimeperiod(value)}
    // >
    //   {time.map((date) => (
    //     <Option key={date}>{date}</Option>
    //   ))}
    // </Select>
  );
};

export default CryptoDetails;
