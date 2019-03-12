import '../article/marked.css';
import React, { Component } from 'react'
import 'emoji-mart/css/emoji-mart.css';
import { Icon, Popover, Button } from 'antd';
import { Picker } from 'emoji-mart';
import { TransitionMotion, spring, Motion } from 'react-motion';
import hljs from 'highlight.js';
import marked from 'marked';


class CommentReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiVisible: false,
      willReply: true,
      userLogin: false,
      userCheck: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //marked相关配置
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

  componentWillReceiveProps(nextProps) {
    // 引用某个评论进行回复，会自动设置焦点到markdown编辑区
    if (nextProps.reference) {
      this.markdown.focus();
    }
  }

  handlePictureClick = () => {
    this.markdown.innerHTML += '<br/>![]()';
  }

  handleLinkClick = () => {
    this.markdown.innerHTML += '[]()';
  }

  handleCodeClick = () => {
    this.markdown.innerHTML += '<br>```javascript<br><br>```'
  }

  handleEmojiMouseOver = () => {
    this.setState({ emojiVisible: true });
  }

  handleEmojiMouseOut = () => {
    this.setState({ emojiVisible: false});
  }

  handleEmojiPick = (emoji) => {
    this.markdown.innerHTML += emoji.native;
  }

  handleWillReplyClose = () => {
    // this.setState({willReply: false})
    this.props.onClickComment();
  }

  handleInvalidNameMsg = (e) => {
    if (e.target.value === '') {
      alert('名字？');
    } else if (e.target.validity.typeMismatch) {
      alert('名字不合法');
    } 
  }

  handleInvalidEmailMsg = (e) => {
    if (e.target.value === '') {
      alert('邮箱？');
    } else if (e.target.validity.typeMismatch) {
      alert('邮箱不合法');
    } 
  }

  handleInvalidSiteMsg = (e) => {
    if (e.target.validity.typeMismatch) {
      alert('网站不合法');
    } 
  }

  onSubmit(e) {
    e.preventDefault();
    const comment = {
      reference: this.props.reference,
      content: this.markdown.innerHTML,
      article_id: this.props.articleId
    }
    const user = {
      name: 'wanted',
      email: '1515430697@qq.com'
    }
    this.props.onPostComment(comment, user);
    this.markdown.innerHTML = '';
    
    // window.scrollTo({
    //   left: 0,
    //   top: 0,
    //   behavior: 'smooth',
    // })
  }

  willEnter(styleThatEnter) {
    return { opacity: 0}
  }

  willLeave(styleThatLeft) {
    return { opacity: spring(0)}
  }

  render() {
    const { reference } = this.props;
    const settingContent = (
      <div className="setting">
        <div onClick={()=> this.setState({userCheck: true, userLogin: false})}>编辑信息</div>
        <div onClick={()=> this.setState({userCheck: false, userLogin: false})}>清空信息</div>
        {/* <p onClick={()=> this.setState({userCheck: true, userLogin: false})}>编辑信息</p>
        <p onClick={()=> this.setState({userCheck: false, userLogin: false})}>清空信息</p> */}
      </div>
    )
    const isEmojiBoxVisibleStr = this.state.emojiVisible ? 'visible' : 'hidden';
    const willReplyContent = reference ? 
    <div className="will-reply">
      <div className="reply-user">
        <span><span>回复 </span><strong>{reference.author}</strong></span>
        <Icon type="close" onClick={this.handleWillReplyClose}/>
      </div>
      <div 
        className="reply-preview"
        dangerouslySetInnerHTML={{
          __html: reference.content ? marked(reference.content) : null,
        }} 
      />
      {/* <div className="reply-preview">
        <p>没有一个跑的通，明天再测</p>
      </div> */}
    </div> : null;
    
    return (
      <form className="comment-post"  onInvalid={(e)=>console.log(e.target)} onSubmit={this.onSubmit}>
        <div className="editor-box">
          <div className="user">
            <div className="gravatar">
              <img alt="wanted" src="https://s.gravatar.com/avatar/a7fd9e4afc0aff417afededc15270312" />
            </div>
          </div>
          <div className="editor">
            {willReplyContent}
            <div className="markdown">
              <div 
                ref={(markdown) => this.markdown = markdown}
                contentEditable={true}
                placeholder='写入你的回复...' 
                className="markdown-editor" 
                onInput={(e) => {console.log(this.markdown.innerHTML)}}
              >
              </div>
            </div>
            <div className="editor-tools">
              <div className="emoji" onMouseOver={this.handleEmojiMouseOver}  onMouseOut={this.handleEmojiMouseOut}>
                <Icon type="smile" />
                <Picker style={{visibility: isEmojiBoxVisibleStr}} className="emoji-box" set='emojione' onSelect={this.handleEmojiPick}/>
              </div>
              <div className="picture" onClick={this.handlePictureClick}><Icon type="picture" /></div>
              <div className="link" onClick={this.handleLinkClick}><Icon type="link" /></div>
              <div className="code" onClick={this.handleCodeClick}><Icon type="code" /></div>
              <button type="submit" className="submit" onClick={()=> this.setState({willReply: true})}>
                <span style={{fontSize: '1rem', marginRight: '0.5rem'}}>发布</span>
                <Icon type="edit" />
              </button>
            </div>
          </div>
        </div>
        {this.state.userLogin ? 
          <div className="user">
            <div className="edit">
              <strong style={{marginRight: '1rem'}}>wanted</strong>
              <Popover content={settingContent} placement="bottom">
                <Icon type="setting"/>
                <span style={{marginLeft: '0.5rem'}}>账号设置</span>
              </Popover>
            </div>
          </div> : 
          <div className="user">
            <div className="name">
              <input required="required" type="text" name="name" placeholder="称呼（必填）" maxLength="10" onInvalid={e=>alert('名字?')} />
            </div>
            <div className="email">
              <input required="required" type="email" name="email" placeholder="邮箱（必填，不会公开）" maxLength="40" onInvalid={this.handleInvalidEmailMsg}/>
            </div>
            <div className="site">
              <input type="url" name="url" placeholder="网站（http, https:// 开头，非必填）" maxLength="40" onInvalid={this.handleInvalidSiteMsg}/>
            </div>
            {this.state.userCheck ? 
              <div className="save">
                <button type="button" onClick={()=>this.setState({userLogin: true})}>
                  <Icon type="check-circle" style={{fontSize: 20, color: 'green'}} />
                </button>
              </div> : null
            }
          </div>
        } 
      </form>
    )
  }
}

export default CommentReply;