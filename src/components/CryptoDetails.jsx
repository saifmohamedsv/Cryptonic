import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Dropdown, Select, Card, Avatar } from "antd";
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
  DownOutlined,
} from "@ant-design/icons";
import {
  useGetCoinHistoryQuery,
  useGetDetailsQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from "./LineChart";
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetDetailsQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod });
  const time = ["24h", "7d", "30d", "1y", "5y"];
  const cryptoDetails = data?.data?.coin;
  console.log(coinHistory);
  if (isFetching) return <Loader />;
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-heading-title">
            <Avatar
              src={cryptoDetails.iconUrl}
              style={{ marginRight: "12px" }}
            />
            {cryptoDetails.name} ( {cryptoDetails.slug} ) price
          </Title>
          <p className="coin-heading-subtitle">
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          timePeriod={timePeriod}
          coinName={cryptoDetails.name}
        />
        <Col className="stats-container">
          <Card
            title={`${cryptoDetails.name} Value Statistics`}
            className="coin-value-statistics"
            hoverable
          >
            <Col className="coin-value-statistics-heading">
              {/* <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title> */}
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, value, title }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}:</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Card>
          <Card
            hoverable
            title={`Other Statistics`}
            className="other-stats-info"
          >
            <Col className="coin-value-statistics-heading">
              {/* <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title> */}
              <p>An overview of all {cryptoDetails.name} stats</p>
            </Col>
            {genericStats.map(({ icon, value, title }) => (
              <Col className="coin-stats" key={title}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}:</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Card>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}?
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row key={link.name} className="coin-link">
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </div>
  );
};

export default CryptoDetails;
