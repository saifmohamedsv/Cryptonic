import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetStatsQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetStatsQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading" color="#fff">
        Global Crypto stats
      </Title>
      <Row
        style={{ justifyContent: "center", gap: "24px" }}
        className="home-page-stats-container"
      >
        <Col
          span={11}
          className="home-page-stats"
          style={{ maxWidth: "220px" }}
        >
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col
          span={11}
          className="home-page-stats"
          style={{ maxWidth: "220px" }}
        >
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col
          span={11}
          className="home-page-stats"
          style={{ maxWidth: "220px" }}
        >
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col
          span={11}
          className="home-page-stats"
          style={{ maxWidth: "220px" }}
        >
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col
          span={11}
          className="home-page-stats"
          style={{ maxWidth: "220px" }}
        >
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Top 10 Cryptocurrencies
        </Title>
        <Title className="show-more" level={4}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Latest Crypto news
        </Title>
        <Title className="show-more" level={4}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
