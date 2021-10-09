import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, Col, Row, Typography } from "antd";
const { Title } = Typography;
function LineChart({ coinHistory, coinName, currentPrice, timePeriod }) {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }
  console.log(coinHistory);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
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
    <>
      {/* <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} /> */}
      <div className="coin-statistics-container">
        <Title level={2} style={{ color: "#001529", marginBottom: "1rem" }}>
          {coinName} Change ( {timePeriod} )
        </Title>
        <Row>
          <Col>
            <Card
              style={{
                maxWidth: "100%",
                borderRadius: "14px",
              }}
              hoverable
              title={`Change History ( The Last ${timePeriod} )`}
            >
              <Title
                level={3}
                style={
                  coinHistory?.data?.change > 0
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {coinHistory?.data?.change > 0 && "+"}
                {coinHistory?.data?.change}%
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LineChart;
