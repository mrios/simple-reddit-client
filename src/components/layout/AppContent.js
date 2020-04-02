import React from "react";
import { useSelector } from "react-redux";

import { Layout } from "antd";

import Posts from "./../posts/Posts";
import PostDetails from "./../posts/PostDetails";

const { Content, Sider } = Layout;

const AppContent = () => {
  const isCollapsed = useSelector(state => state.app.isCollapsed);

  return (
    <Content style={{ marginTop: 64 }}>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={isCollapsed}
          width="50%"
          className="sidebar-section"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Posts />
        </Sider>
        <Content className="post-details">
          <PostDetails />
        </Content>
      </Layout>
    </Content>
  );
};

export default AppContent;
