import React from 'react';
import { connect } from 'react-redux'
import { Layout, Alert, Typography } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const PostImage = data => {
  return ( data.thumbnail.indexOf('http') > -1 ? (<img alt="thubmnail" src={ data.thumbnail } /> ) : '' )
}

class Post extends React.Component {
  
  render() {
    const { post } = this.props;
    return (
      <Layout style={ { position: 'fixed', zIndex: 1, padding: 20 }}>
        <Content>
          { this.props.isSelected ? (
            <div className="details-container">
              <Title level={3}>{post.title}</Title>
              <PostImage thumbnail={post.thumbnail}/>
              <p style={ {padding: 10} }>{post.num_comments} Comments </p>
            </div>
            ) : (
              <Alert
                message="Looking for the latest news?"
                description="Please, select a post to see more details"
                type="info"
                showIcon
                style={ {width: '100%'} }
              />
            )
          }
        </Content>
      </Layout>
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