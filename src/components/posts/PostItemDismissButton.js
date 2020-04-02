import React from "react";
import { Button } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";

const PostItemDismissButton = () => (
  <span>
    <Button
      type="link"
      danger
      icon={<CloseCircleTwoTone twoToneColor="#eb2f96" />}
      style={{ marginRight: 8 }}
    >
      <span style={{ color: "grey" }}>Dismiss Post</span>
    </Button>
  </span>
);

export default PostItemDismissButton;
