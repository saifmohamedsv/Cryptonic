import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  FundOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Typography.Title level={2} className="logo" style={{ margin: "0" }}>
          <Link to="/" style={{ color: "#d9d9d9", textTransform: "uppercase" }}>
            Cryptonic
          </Link>
        </Typography.Title>
        <MenuOutlined
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
          onClick={() => setActiveMenu(!activeMenu)}
          className="menu-control-container"
        />
      </div>
      {activeMenu && (
        <Menu theme="dark" className="nav-menu">
          <Menu.Item
            draggable
            className="menu-item"
            icon={<HomeOutlined />}
            key="1"
          >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item className="menu-item" icon={<FundOutlined />} key="2">
            <Link to="/cryptocurrencies">Crypto Currencies</Link>
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            icon={<MoneyCollectOutlined />}
            key="3"
          >
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item className="menu-item" icon={<BulbOutlined />} key="4">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
