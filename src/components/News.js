import React, { useState } from "react";
// import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { Card, Row, Col, Form, Container } from "react-bootstrap";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
// const { Text, Title } = Typography;
// const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 3 : 12,
  });

  function handleSearch(value) {
    setNewsCategory(value.target.value);
  }

  if (!cryptoNews?.value) return <Loader />;

  console.log(cryptoNews)

  return (
    <Container className="my-5">
      {!simplified && (
        <Form.Select
          size="lg"
          onChange={handleSearch}
        >
          <option value="Cryptocurrency">Cryptocurrency</option>
          {data?.data?.coins?.map((currency, i) => (
            <option key={i} value={currency.name}>{currency.name}</option>
          ))}
        </Form.Select>
      )}
      <Row className="my-5">
        {cryptoNews.value.map((news, i) => (
          <Col lg={4} md={6} sm={12} key={i} className="my-3">
            <Card>
              <a href={news.url} target="_blank" rel="noreferrer">
                <Card.Img
                  className="news-img"
                  variant="top"
                  src={
                    `${news?.image?.thumbnail?.contentUrl}` || demoImage
                  }
                  alt=""
                />
                <Card.Body>
                  <Card.Title as="h4">
                    {news.name.length > 60
                      ? `${news.name.substring(0, 60)}...`
                      : news.name}
                  </Card.Title>
                  <Card.Text bsPrefix="news-text">
                    {news.description.length > 130
                      ? `${news.description.substring(0, 130)}...`
                      : news.description}
                  </Card.Text>
                </Card.Body>
                <Container className="news-provider">
                  <Card.Img
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Card.Title as="h6">{news.provider[0]?.name}</Card.Title>
                  <Card.Title as="h6">
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Card.Title>
                </Container>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
