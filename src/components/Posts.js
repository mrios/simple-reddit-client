import React, {Component} from 'react';
import { List, Avatar, Button, Tag } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'n minutes ago',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources...',
  });
}

const DismissButton = ({ text, active }) => (
  <span>
    <Button
      type="link"
      danger
      icon={<CloseCircleTwoTone twoToneColor="#eb2f96"/>}
      style={{ marginRight: 8, color: active ? '#1890ff' : '' }}
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
    <span class="post-title-minutes">{item.description}</span>
  </span>
)

class Posts extends Component {
  state = {};

  render() {
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

export default Posts