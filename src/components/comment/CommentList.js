import React, { Component } from "react";
import { List, Icon } from "antd";
import CommentItem from "./CommentItem";

class CommentList extends Component {
  scrollToBottom = () => {
    this.list.scrollIntoView({ behavior: "smooth", block: "end" });
    this.props.setCommentUpdate();
  };

  componentDidUpdate() {
    if (this.props.postupdate) {
      this.scrollToBottom();
    }
  }

  render() {
    const { userData } = this.props;
    let email = "";
    if (userData) {
      email = userData.email;
    }
    return (
      <div
        className="list-box"
        ref={el => {
          this.list = el;
        }}
      >
        <List
          itemLayout="vertical"
          dataSource={this.props.data}
          locale={{ emptyText: <Icon type="copy"/> }}
          renderItem={item => (
            <CommentItem
              onClickComment={this.props.onClickComment}
              onClickLike={this.props.onClickLike}
              data={item}
              email={email}
            />
          )}
        />
      </div>
    );
  }
}

export default CommentList;
