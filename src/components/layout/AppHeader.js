import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import logger from "use-reducer-logger";

import { Layout, Row, Col, Button } from "antd";
import {
  RedditOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";

// App actions
import { toggleMenu } from "../../actions/AppActions";

// Posts actions
import { dismissAll, fetchPostsIfNeeded } from "../../actions/PostActions";

const { Header } = Layout;

const AppHeader = () => {
  const isCollapsed = useSelector(state => state.app.isCollapsed);
  const [items, setItems] = useState([]);
  const dispatch = logger(useDispatch());
  const store = useStore();

  const loadData = () => {
    dispatch(fetchPostsIfNeeded()).then(res => {
      setItems(res.items);
    });
  };

  const clearData = () => {
    dispatch(dismissAll());
    setItems(store.getState().posts.items);
  };

  // TODO: see useCallback for async calls
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        padding: "0 30px"
      }}
    >
      <Row justify="start">
        <Col xs={3} lg={1}>
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                dispatch(toggleMenu(!isCollapsed));
              },
              style: { fontSize: 20 }
            }
          )}
        </Col>
        <Col xs={13} lg={7}>
          <h4>
            <RedditOutlined style={{ marginRight: 8, fontSize: 20 }} />
            Simple Reddit Client
          </h4>
        </Col>
        <Col xs={8} lg={4}>
          {items.length > 0 ? (
            <Button danger size="small" onClick={() => clearData()}>
              Dismiss All
            </Button>
          ) : (
            <Button type="primary" size="small" onClick={() => loadData()}>
              Fetch Data
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
