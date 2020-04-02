import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logger from "use-reducer-logger";

import { List, Avatar, Spin, Layout } from "antd";
import QueueAnim from "rc-queue-anim";

import { selectPost, dismissPost } from "../../actions/PostActions";
import PostItemDismissButton from "./PostItemDismissButton";
import PostItemTitle from "./PostItemTitle";

const { Content } = Layout;

const Posts = () => {
  const isFetching = useSelector(state => state.posts.isFetching);
  const items = useSelector(state => state.posts.items);

  const dispatch = logger(useDispatch());

  return isFetching ? (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  ) : (
    <div>
      <Layout>
        <Content>
          <List
            itemLayout="vertical"
            size="small"
            pagination={{
              pageSize: 10,
              position: "both"
            }}
            dataSource={items}
            renderItem={item => (
              <QueueAnim component="span" type={["right", "left"]} leaveReverse>
                <List.Item
                  style={{ padding: "20px 10px" }}
                  key={item.title}
                  actions={[
                    <span onClick={() => dispatch(dismissPost(item.id))}>
                      <PostItemDismissButton />
                    </span>,
                    <span onClick={() => dispatch(selectPost(item.id))}>
                      {item.num_comments} Comments
                    </span>,
                    <span onClick={() => dispatch(selectPost(item.id))}>
                      >>
                    </span>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span onClick={() => dispatch(selectPost(item.id))}>
                        <PostItemTitle item={item} />
                      </span>
                    }
                    avatar={
                      <span onClick={() => dispatch(selectPost(item.id))}>
                        <Avatar shape="square" size={64} src={item.thumbnail} />
                      </span>
                    }
                  />
                  {item.content}
                </List.Item>
              </QueueAnim>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default Posts;
