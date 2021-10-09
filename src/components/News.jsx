import React, { useState } from "react";
import {
  Select,
  Avatar,
  Typography,
  Row,
  Col,
  Card,
  Space,
  Skeleton,
} from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetStatsQuery } from "../services/cryptoApi";
import DemoImage from "../Images/andre-francois-mckenzie-JrjhtBJ-pGU-unsplash.jpg";
import moment from "moment";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const { Meta } = Card;
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetStatsQuery(100);
  if (!cryptoNews?.value) return <Loader />;
  return (
    <>
      {!simplified && <Title level={2}>Latest {newsCategory} News</Title>}
      <Row gutter={[32  , 32  ]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(e) => setNewsCategory(e)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option key={coin.name} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value?.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              className="news-card"
              style={{ borderRadius: "14px" }}
              extra={
                // <div className="provider-container">
                //   <Text>
                //     {moment(news.datePublished).startOf("ss").fromNow()}
                //   </Text>
                // </div>
                <Meta
                  avatar={
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    />
                  }
                />
              }
              title={news?.provider[0]?.name}
              hoverable
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Space>
                    <Title
                      level={5}
                      className="news-title"
                      style={{ width: "100%" }}
                    >
                      {news.name}
                    </Title>
                    <img
                      style={{
                        maxWidth: "200px",
                        maxHeight: "100px",
                        borderRadius: "4px",
                      }}
                      src={news?.image?.thumbnail?.contentUrl || DemoImage}
                      alt="news post"
                    />
                  </Space>
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}`
                    : news.description}
                  <span style={{ color: "#643fdb" }}>.... Read More</span>
                  <div
                    className="provider-container"
                    style={{ marginTop: "32px" }}
                  >
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </p>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
