import React from "react";
import { Line } from "react-chartjs-2";
// import { Col, Row, Typography } from "antd";
import { Row, Col, Container } from "react-bootstrap";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(58, 123, 213, 1)");
    gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");
    return {
      labels: coinTimestamp,
      datasets: [
        {
          label: "Price In USD",
          data: coinPrice,
          borderWidth: 3,
          fill: true,
          backgroundColor: gradient,
          radius: 0,
          tension: 0.4,
        },
      ],
    };
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={6}>
          <h3>{coinName} Price Chart</h3>
        </Col>
        <Col className="chart-info">
          <h6>Change: {coinHistory?.data?.change}%</h6>
          <h6>
            Current {coinName} Price: $ {currentPrice}
          </h6>
        </Col>
      </Row>
      <Line id="myCanvas" data={data} options={options} />
    </Container>
  );
};

export default LineChart;
