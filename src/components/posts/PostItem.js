import React from 'react';
import { connect } from 'react-redux'
import { Layout, Alert, Row, Col, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

class Post extends React.Component {
  
  render() {
    const { post } = this.props;
    return (
      this.props.isSelected ? (
        <Layout style={ { position: 'fixed', zIndex: 1, width: '50%', padding: 20, marginLeft: '45%' }}>
          <Content>
            <Title level={3}>{post.title}</Title>
            <p>{post.description}</p>
          </Content>
        </Layout>
      ) : (
        <Row>
          <Col span={24} offset={4} style={ {marginTop: 40} }>
          <Alert
            message="Looking for some news?"
            description="Click on it :D"
            type="info"
            showIcon
          />
          </Col>
        </Row>
      )
    )
  }
}

const mapStateToProps = state => {
  const post = state.items.find(
    item => item.id === state.selectedId
  ) || {
    title: '',
    description: ''
  };
  const isSelected = state.selectedId !== null

  return {
    post,
    isSelected
  };
};

export default connect(mapStateToProps)(Post);