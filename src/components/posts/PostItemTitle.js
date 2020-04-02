import React from "react";
import Moment from "react-moment";

import { Tag, Row, Col, Typography } from "antd";
import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const PostItemTitle = props => (
  <Row>
    {props.item.unread === false ? (
      ""
    ) : (
      <Col xs={24} lg={3}>
        <Tag color="#f50">new!</Tag>
      </Col>
    )}
    <Col xs={24} lg={10}>
      <UserOutlined />
      <Text code>{props.item.author}</Text>
    </Col>
    <Col xs={24} lg={8}>
      <FieldTimeOutlined />
      <Text code>
        <Moment fromNow unix>
          {props.item.created_utc}
        </Moment>
      </Text>
    </Col>
    <Col xs={24}>
      <Title level={4}>{props.item.title}</Title>
    </Col>
  </Row>
);

export default PostItemTitle;
