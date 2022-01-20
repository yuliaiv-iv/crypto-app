import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Container } from "react-bootstrap";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
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
    gradient.addColorStop(0, "rgba(111, 66, 193, 1)");
    gradient.addColorStop(1, "rgba(222, 205, 255, 0.4)");
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
    <Container className="my-5 p-0">
      <Row>
        <Col lg={6} md={12}>
          <h3 className="text-details">{coinName} Price Chart</h3>
          <h6>Change: {coinHistory?.data?.change}%</h6>
          <h6>Current Price: $ {currentPrice}</h6>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </Container>
  );
};

export default LineChart;
