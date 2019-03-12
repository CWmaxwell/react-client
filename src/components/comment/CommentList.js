import React, { Component } from 'react'
import { List } from 'antd';
import CommentItem from './CommentItem';
import { getComments } from '../../actions/commentAction';
class CommentList extends Component {
  scrollToBottom = () => {
    this.list.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="list-box" ref={(el) => {this.list = el}}>
        <List 
          itemLayout="vertical"
          dataSource={this.props.data}
          renderItem={item => (
            <CommentItem onClickComment={this.props.onClickComment} data={item}/>
          )}
        />
      </div>
    )
  }
}

export default CommentList;