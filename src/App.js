import React from 'react';
import 'antd/dist/antd.dark.css'
import './styles/app.css';


import { Layout } from 'antd';
import Posts from './components/posts/Posts';
import PostItem from './components/posts/PostItem';
const { Header, Footer, Sider, Content, Tag } = Layout;


function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <h3>Simple Reddit Client, top 50</h3></Header>
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <Layout>
            <Sider
              width="45%"
              className="sidebar-section"
              breakpoint="lg"
              collapsedWidth="0">
              <Posts/>
            </Sider>
            <Layout>
              <Header theme="light">Post Title</Header>
              <Content>
                <PostItem/>
              </Content>
            </Layout>
        </Layout>
      </Content>
    <Footer>Built by Matias Rios, view code on <a target="_blank" href="https://github.com/mrios/simple-reddit-client">github</a></Footer>
</Layout>
    </div>
  );
}

export default App;
