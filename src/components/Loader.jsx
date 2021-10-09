import React from "react";
import { Alert, Spin } from "antd";
const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large">
      </Spin>
    </div>
  );
};

export default Loader;
