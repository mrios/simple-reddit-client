import React from 'react';
import { List, Avatar, Button, Tag } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {
  selectPost,
  fetchPostsIfNeeded,
  dismissPost
} from '../../actions'


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

const CommentsCounter = ({ count }) => (
  <span>
    {count} Comments
  </span>
);

const PostTitle = ({ item }) => (
  <span>
    <Tag color="#f50">new!</Tag>
    <Button type="link" href={item.href}>{item.title}</Button>
    <span className="post-title-minutes">{item.description}</span>
  </span>
)

class Posts extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const listData = this.props.posts
    return (
        <List
            itemLayout="vertical"
            size="small"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 10,
            }}
            dataSource={listData}
            renderItem={item => (
            <List.Item
                style={{ padding: '20px 10px' }}
                key={item.title}
                actions={[
                <DismissButton text="Dismiss Post" />,
                <CommentsCounter count="1500"  />,
                ]}
            >
                <List.Item.Meta
                title={ <PostTitle item={item} />}
                avatar={<Avatar src={item.avatar} />}
                />
                {item.content}
            </List.Item>
            )}
        />
    )
  }
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, items: posts } = state.posts || {
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Posts)