import React, { Component } from 'react'
import { Icon } from 'antd';
class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeOver: false,
      commentOver: false,
    }
  }

  handleLikeMouseOver = e => {
    this.setState({ likeOver: true });
  }

  handleLikeMouseOut = e => {
    this.setState({ likeOver: false });
  }

  handleCommentMouseOver = e => {
    this.setState({ commentOver: true });
  }

  handleCommentMouseOut = e => {
    this.setState({ commentOver: false });
  }

  render() {
    // #eb2f96
    const { likeOver, commentOver } = this.state;
    const likeColor = likeOver ? '#eb2f96' : 'grey';
    const commentColor = commentOver ? 'green' : 'grey';
    return (
      <aside>
          <div 
            className="aside-like" style={{marginBottom: 2}} 
            onMouseOver={this.handleLikeMouseOver}
            onMouseOut={this.handleLikeMouseOut}
          >
            <Icon type="heart" theme="twoTone" twoToneColor={likeColor}/>
            <span>19</span>
          </div>
          <div 
            className="aside-comment"
            onMouseOver={this.handleCommentMouseOver}
            onMouseOut={this.handleCommentMouseOut}
          >
            <Icon type="message" theme="twoTone" twoToneColor={commentColor}/>
            <span>12</span>
          </div>
      </aside>
    )
  }
}

export default Aside;