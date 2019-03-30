import '../article/marked.css';
import React, { Component } from 'react'
import { Icon, Tag } from 'antd';
import hljs from 'highlight.js';
import marked from 'marked';
import timeConversion from '../../utils/timeConversion'
class CommentItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      replyVisible: false,
    }
  }

  componentWillMount() {
    // marked相关配置
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
    });
  }
  
  handleMouseOver = e => {
    this.setState({replyVisible: true});
  }

  handleMouseOut = e => {
    this.setState({replyVisible: false});
  }

  handleClickReply = () => {
    const { data } = this.props;
    const reference = {author: data.user.name, content: data.content};
    this.props.onClickComment(reference);
  }

  handleClickLike = () => {
    const { data } = this.props;
    const user = localStorage.getItem('user');
    if (user && user !== "undefined" && user !== null) {
      const storeUser = JSON.parse(user);
      const email = storeUser.email;
      if (data.likes.indexOf(email) !== -1) {
        return;
      }
      const params = { id: data._id, email };
      this.props.onClickLike(params);
    } else {
      alert("请先评论");
      return;
    }
  }

  render() {
    const { data, email } = this.props;
    const visibility = this.state.replyVisible ? 'visible': 'hidden';
    let hasLiked = false;
    if (email !== '' && data.likes.indexOf(email) !== -1) {
      hasLiked = true;
    }
    return (
      <div className="comment-item" onMouseOut={this.handleMouseOut} onMouseOver={this.handleMouseOver}>
        <div className="cm-avatar">
          <a target="_blank" rel="external nofollow">
            <img alt={data.user.name} src={data.user.avatar} />
          </a>
          {data.user.is_admin ? <Tag color="#108ee9" style={{ marginTop: '0.4rem' }}>博主</Tag> : null}
        </div>
        <div className="cm-body">
          <div className="cm-header">
            <a target="_blank" rel="external nofollow" className="user-name">
              <span>{data.user.name}</span>
            </a>
            { data.is_top ? <Tag color="magenta">已置顶</Tag> : null }
            <span className="cm-time">{timeConversion(data.create_time)}</span>
          </div>
          <div className="cm-content">
            {data.Reference ? 
              <div className="reply-box">
                <p className="reply-name">
                  <strong style={{fontWeight: "bolder"}}>{data.Reference.author}</strong>
                </p>
                <div 
                  className="reply-content"
                  dangerouslySetInnerHTML={{
                    __html: data.Reference.content ? marked(data.Reference.content) : null,
                  }} 
                />
              </div> : null
            }
            <div 
              dangerouslySetInnerHTML={{
                __html: data.content ? marked(data.content) : null,
              }} 
            />
          </div>
          <div className="cm-footer">
            <a  className="like" onClick={this.handleClickLike} style={{ color: hasLiked ? '#ca5c54' : null }}>
              <Icon type="like"/>
              <span style={{marginLeft: '.2em'}}>顶&nbsp;({data.likes.length})</span>
            </a>
            <a  className="reply" onClick={this.handleClickReply}>           
              <Icon type="arrow-left" style={{visibility: visibility}}/>
              <span style={{marginLeft: '.2em', visibility: visibility}}>回复</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentItem;