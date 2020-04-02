import React from "react";
import { useSelector } from "react-redux";

import { Layout, Alert, Typography } from "antd";

const { Title } = Typography;
const { Content } = Layout;

const PostImage = data => {
  return data.thumbnail.indexOf("http") > -1 ? (
    <img alt="thubmnail" src={data.thumbnail} />
  ) : (
    ""
  );
};

const PostDetails = () => {
  const selectedId = useSelector(state => state.posts.selectedId);
  const post = useSelector(state =>
    state.posts.items.find(item => item.id === selectedId)
  );
  const isSelected = selectedId !== null;

  return (
    <Layout style={{ position: "fixed", zIndex: 1, padding: 20 }}>
      <Content>
        {isSelected && post ? (
          <div className="details-container">
            <Title level={3}>{post.title}</Title>
            <PostImage thumbnail={post.thumbnail} />
            <p style={{ padding: 10 }}>{post.num_comments} Comments </p>
          </div>
        ) : (
          <Alert
            message="Looking for the latest news?"
            description="Please, select a post to see more details"
            type="info"
            showIcon
            style={{ width: "100%" }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default PostDetails;
