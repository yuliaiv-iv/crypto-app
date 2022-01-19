import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import {
  Card,
  Row,
  Col,
  InputGroup,
  Container,
  ListGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import millify from "millify";
// import { Col, Row, Typography, Select } from "antd";
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
  // const volume24h = cryptoDetails["24hVolume"]

  if (isFetching) return <Loader />;

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
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
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
      title: "All-time-high(daily avg.)",
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

  return (
    <Container className="my-4">
      <h1>
        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
      </h1>
      <p>
        {cryptoDetails.name} live price in US Dollar (USD). View value
        statistics, market cap and supply.
      </p>
      {/* <Container className="select-style">
        <select>
          <option value="0">Select car:</option>
          <option value="1">Audi</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
          <option value="4">Ford</option>
          <option value="5">Honda</option>
        </select>
      </Container> */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <Container className="my-5">
        <Row>
          <Col md={6} className="info-card">
            <h2>{cryptoDetails.name} Value</h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
            <Col>
              {stats.map(({ icon, title, value }) => (
                <Card className="details">
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
          </Col>
          <Col md={6} className="info-card">
            <h2>Other Stats Info</h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
            <Col>
              {genericStats.map(({ icon, title, value }) => (
                <Card className="details">
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
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <h2>What is {cryptoDetails.name}?</h2>
            {HTMLReactParser(cryptoDetails.description)}
          </Col>
          <Col md={6}>
            <h2>{cryptoDetails.name} Links</h2>
            {cryptoDetails.links?.map((link) => (
              <Card className="details">
                <ListGroup variant="flush">
                  <ListGroup.Item className="info">
                    <Col className="info-title" sm={6}>
                      <h6>{link.type}</h6>
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
