import React from 'react';
import 'antd/dist/antd.dark.css'
import './styles/app.css';

import { Layout, Row, Col } from 'antd';
import { RedditOutlined, GithubOutlined } from '@ant-design/icons';
import Posts from './components/posts/Posts';
import PostItem from './components/posts/PostItem';
const { Header, Sider, Content } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row justify="end">
            <Col span={8}>
              <h3><RedditOutlined style={{marginRight: 8, fontSize: 20}}/>Simple Reddit Client, top 50</h3>
            </Col>
            <Col span={5} offset={11}>
              Made by Matias Rios, view code on
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/mrios/simple-reddit-client"><GithubOutlined style={{marginLeft: 8, fontSize: 20, color: 'white'}} /></a>
            </Col>
          </Row>
        </Header>
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <Layout>
            <Sider
              width="45%"
              className="sidebar-section"
              breakpoint="lg"
              collapsedWidth="0">
              <Posts/>
            </Sider>
            <PostItem />
        </Layout>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
