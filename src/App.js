import React from 'react';
import 'antd/dist/antd.dark.css'
import './styles/app.css';

import { Layout, Row, Col, Button } from 'antd';
import { RedditOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Posts from './components/posts/Posts';
import PostItem from './components/posts/PostItem';

import { connect } from 'react-redux'

import {
  fetchPostsIfNeeded,
  dismissAll
} from './components/posts/PostActions'

const { Sider, Header, Content } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleDismissAll = this.handleDismissAll.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.state = {
      collapsed: false
    }
  }

  handleFetchData() {
    this.props.dispatch(fetchPostsIfNeeded())
  }

  handleDismissAll() {
    this.props.dispatch(dismissAll())
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={ { position: 'fixed', zIndex: 1, width: '100%', padding: '0 30px'  }}>
            <Row justify="start">
              <Col xs={3} lg={1}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
                style: { fontSize: 20}
              })}
              </Col>
              <Col xs={13} lg={7}>
                <h4><RedditOutlined style={{marginRight: 8, fontSize: 20}}/>
                  Simple Reddit Client
                </h4>
              </Col>
              <Col xs={8} lg={4}>
                { this.props.items.length > 0 ? (
                  <Button danger size="small" onClick={ () => this.handleDismissAll() }>
                    Dismiss All
                  </Button>
                ) : (
                  <Button type="primary" size="small" onClick={ () => this.handleFetchData() }>
                    Fetch Data
                  </Button>
                )}
              </Col>
            </Row>
          </Header>
          <Content style={ { marginTop: 64 } }>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                width="50%"
                className="sidebar-section"
                breakpoint="lg"
                collapsedWidth="0">
                <Posts/>
              </Sider>
              <Content className="post-details">
                <PostItem />
              </Content>
            </Layout>
          </Content>
      </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, items } = state || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)