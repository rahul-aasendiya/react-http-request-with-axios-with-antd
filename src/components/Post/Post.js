import React from "react";
import { Card } from "antd";

import "./Post.css";

const post = (props) => (
  <Card
    title={props.title}
    bordered={false}
    onClick={props.clicked}
    className="Post"
  >
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </Card>
);

export default post;
