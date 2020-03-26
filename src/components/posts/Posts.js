import React from 'react';
import { List, Avatar, Button, Tag, Spin, Typography } from 'antd';
import { CloseCircleTwoTone, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import {
  selectPost,
  fetchPostsIfNeeded,
  dismissPost
} from './PostActions'

const { Text, Title } = Typography;

const DismissButton = () => (
  <span>
    <Button
      type="link"
      danger
      icon={<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      style={{ marginRight: 8 }}
    >
    <span style={{color: 'grey'}}>Dismiss Post</span>
    </Button>
  </span>
);

const PostTitle = ( {item} ) => (
  <Row>
    {item.unread === false ? '' : <Col xs={24} lg={3}><Tag color="#f50">new!</Tag></Col>}
    <Col xs={24} lg={10}>
        <UserOutlined />
        <Text code>{item.author}</Text>
    </Col>
    <Col xs={24} lg={8}>
        <FieldTimeOutlined />
        <Text code><Moment fromNow unix>{item.created_utc}</Moment></Text>
    </Col>
    <Col xs={24}>
      <Title level={4}>{item.title}</Title>
    </Col>
  </Row>
)

class Posts extends React.Component {

  constructor(props) {
    super(props)
    this.handleSelectPost = this.handleSelectPost.bind(this)
    this.handleDismissPost = this.handleDismissPost.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded())
  }

  handleSelectPost(postId) {
    this.props.dispatch(selectPost(postId))
  }

  handleDismissPost(postId) {
    this.props.dispatch(dismissPost(postId))
  }

  render() {
    const listData = this.props.items
    return (
      this.props.isFetching ? 
      <div className="loading-container">
        <Spin size="large" />
      </div> : (
        <List
            itemLayout="vertical"
            size="small"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 10,
            position: 'both'
            }}
            dataSource={listData}
            renderItem={item => (
            <List.Item
                style={{ padding: '20px 10px' }}
                key={item.title}
                actions={[
                  <span onClick={ () => this.handleDismissPost(item.id) }>
                    <DismissButton item={item} />
                  </span>,
                <CommentsCounter count={item.num_comments}  />,
                <span onClick={ () => this.handleSelectPost(item.id) }>>></span>
                ]}
            >
                <List.Item.Meta
                title={ 
                <span onClick={ () => this.handleSelectPost(item.id) }>
                  <PostTitle item={item}  />
                </span>}
                avatar={<Avatar shape="square" size={64} src={item.thumbnail} />}
                />
                {item.content}
            </List.Item>
            )}
        />
      )
    )
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

Posts.propTypes = {
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Posts)