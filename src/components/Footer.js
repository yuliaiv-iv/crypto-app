import React from "react";
import { Link } from "react-router-dom";
import { Typography, Space } from "antd";
const { Paragraph } = Typography;

const Footer = () => {
  return (
    <footer className="footer">
      <Typography>
        <Paragraph>
          Cryptocurrency <br />
          All rights reserved
        </Paragraph>
      </Typography>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </footer>
  );
};

export default Footer;
