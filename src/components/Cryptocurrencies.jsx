import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col, Row, Input, Typography } from "antd";
import { useGetStatsQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetStatsQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return <Loader   />;
  return (
    <>
      <Typography.Title level={2}>
        {simplified ? "" : "All Cryptocurrencies"}
      </Typography.Title>
      {!simplified && (
        <div className="search-crypto">
          <Input
            type="text"
            placeholder="Search Crypto Currency..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((res) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={res.id}>
            <Link to={`/crypto/${res.id}`}>
              <Card
                style={{ borderRadius: "18px" }}
                color="#333"
                title={`${res.rank}. ${res.name}`}
                extra={<img className="crypto-image" src={res.iconUrl} />}
                loading={isFetching ? true : false}
                hoverable
              >
                <p>Price: {millify(res.price)}</p>
                <p>Market Cap: {millify(res.marketCap)}</p>
                <p>Daily Change: {millify(res.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
