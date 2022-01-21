import React, { useState } from "react";
import moment from "moment";
import { Card, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 3 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Container className="my-5 p-0">
      <h1>Latest Crypto News</h1>
      {!simplified && (
        <Container className="my-5 p-0">
          <Dropdown>
            <Dropdown.Toggle className="drop-btn" id="dropdown-basic">
              {newsCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {data?.data?.coins?.map((currency, i) => (
                <Dropdown.Item
                  key={i}
                  onClick={() => {
                    setNewsCategory(currency.name);
                  }}
                >
                  {currency.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      )}
      <Row className="mt-5">
        {cryptoNews.value.length === 0 ? (
          <h5>Nothing matched your search terms</h5>
        ) : (
          cryptoNews.value.map((news, i) => (
            <Col xl={4} lg={6} md={6} key={i} className="my-3">
              <Card xl={6} className="card-link">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <Container className="news-header">
                    <Card.Img
                      className="news-img"
                      variant="top"
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt=""
                    />
                    <Card.Title as="h5" bsPrefix="news-title">
                      {news.name}
                    </Card.Title>
                  </Container>
                  <Card.Body>
                    <Card.Text bsPrefix="news-text">
                      {news.description}
                    </Card.Text>
                  </Card.Body>
                  <Container className="news-provider">
                    <Card.Title as="h6">
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Card.Title>
                  </Container>
                </a>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default News;

// <Form.Select size="lg" onChange={handleSearch}>
//   <option value="Cryptocurrency">Cryptocurrency</option>
//   {data?.data?.coins?.map((currency, i) => (
//     <option key={i} value={currency.name}>
//       {currency.name}
//     </option>
//   ))}
// </Form.Select>
