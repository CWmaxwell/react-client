import "../article/marked.css";
import React, { Component } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Icon, Popover, Button } from "antd";
import { Picker } from "emoji-mart";
import { TransitionMotion, spring, Motion } from "react-motion";
import hljs from "highlight.js";
import marked from "marked";

class CommentReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiVisible: false,
      name: '',
      email: '',
      userSetting: false // 0表示清空信息，1表示
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
      }
    });
  }

  // componentDidMount() {
  //   if (this.props.userData) {
  //     // console.log('更新name和email值')
  //     const { userData } = this.props;
  //     this.setState({
  //       name: userData.name,
  //       email: userData.email
  //     })
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // 引用某个评论进行回复，会自动设置焦点到markdown编辑区
    if (nextProps.reference) {
      this.markdown.focus();
    }
    if (nextProps.userData) {
      const { userData } = nextProps;
      this.setState({
        name: userData.name,
        email: userData.email
      })
    }
  }

  handlePictureClick = () => {
    this.markdown.innerHTML += "<br/>![]()";
  };

  handleLinkClick = () => {
    this.markdown.innerHTML += "[]()";
  };

  handleCodeClick = () => {
    this.markdown.innerHTML += "<br>```javascript<br><br>```";
  };

  handleEmojiMouseOver = () => {
    this.setState({ emojiVisible: true });
  };

  handleEmojiMouseOut = () => {
    this.setState({ emojiVisible: false });
  };

  handleEmojiPick = emoji => {
    this.markdown.innerHTML += emoji.native;
  };

  handleWillReplyClose = () => {
    // this.setState({willReply: false})
    this.props.onClickComment();
  };

  handleInvalidNameMsg = e => {
    if (e.target.value === "") {
      alert("名字？");
    } else if (e.target.validity.typeMismatch) {
      alert("名字不合法");
    }
  };

  handleInvalidEmailMsg = e => {
    if (e.target.value === "") {
      alert("邮箱？");
    } else if (e.target.validity.typeMismatch) {
      alert("邮箱不合法");
    }
  };

  handleInvalidSiteMsg = e => {
    if (e.target.validity.typeMismatch) {
      alert("网站不合法");
    }
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(document.activeElement);
    const target = document.activeElement;
    if (target.name === 'update') {
      this.setState({userSetting: false});
      const user = {
        name: this.state.name,
        email: this.state.email
      }
      this.props.updateUser(user);
    } else {
      if (this.markdown.innerHTML === '') {
        alert('内容?');
        return;
      }
      console.log('state的name和email值', this.state.name, this.state.email);
      const comment = {
        reference: this.props.reference,
        content: this.markdown.innerHTML,
        article_id: this.props.articleId
      };
      const user = {
        name: this.state.name,
        email: this.state.email
      };
      this.props.onPostComment(comment, user);
      this.props.updateArticleComments();
      this.markdown.innerHTML = "";
    }
  }

  onPasteMarkDown = (e) => {
    e.preventDefault();
    // 以下只适用于chrome之类的浏览器，IE还没做适配
    document.execCommand("insertText",false, e.clipboardData.getData('Text'))
    
  }

  onClickClearUser = () => {
    this.setState({ userSetting: false });
    this.props.setCurrentUser(null);
  };
  onClickEditUser = () => {
    const { userData } =  this.props;
    this.setState({ 
      userSetting: true,
      name: userData ? userData.name : null,
      email: userData ? userData.email : null
    })
  }
  onClickComfirm = () => {
    this.setState({userSetting: false});
    const user = {
      name: this.state.name,
      email: this.state.email
    }
    this.props.updateUser(user);
  }
  willEnter(styleThatEnter) {
    return { opacity: 0 };
  }

  willLeave(styleThatLeft) {
    return { opacity: spring(0) };
  }

  render() {
    const { reference, userData } = this.props;
    const { name, email, emojiVisible, userSetting } = this.state;
    const userAvatar = userData ? userData.avatar : "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=48&d=mm&r=g"
    const settingContent = (
      <div className="setting">
        <div onClick={this.onClickEditUser}>编辑信息</div>
        <div onClick={this.onClickClearUser}>清空信息</div>
        {/* <p onClick={()=> this.setState({userCheck: true, userLogin: false})}>编辑信息</p>
        <p onClick={()=> this.setState({userCheck: false, userLogin: false})}>清空信息</p> */}
      </div>
    );
    const isEmojiBoxVisibleStr = emojiVisible ? "visible" : "hidden";
    const willReplyContent = reference ? (
      <div className="will-reply">
        <div className="reply-user">
          <span>
            <span>回复 </span>
            <strong>{reference.author}</strong>
          </span>
          <Icon type="close" onClick={this.handleWillReplyClose} />
        </div>
        <div
          className="reply-preview"
          dangerouslySetInnerHTML={{
            __html: reference.content ? marked(reference.content) : null
          }}
        />
      </div>
    ) : null;

    return (
      <form
        className="comment-post"
        onSubmit={this.onSubmit}
      >
        <div className="editor-box">
          <div className="user">
            <div className="gravatar">
              <img
                alt={userData? userData.name : 'none'}
                src={userAvatar}
              />
            </div>
          </div>
          <div className="editor">
            {willReplyContent}
            <div className="markdown">
              <div
                ref={markdown => (this.markdown = markdown)}
                contentEditable={true}
                placeholder="写入你的回复..."
                className="markdown-editor"
                onPaste={this.onPasteMarkDown}
                // onInput={e => {
                //   console.log(this.markdown.innerHTML);
                // }}
              />
            </div>
            <div className="editor-tools">
              <div
                className="emoji"
                onMouseOver={this.handleEmojiMouseOver}
                onMouseOut={this.handleEmojiMouseOut}
              >
                <Icon type="smile" />
                <Picker
                  style={{ visibility: isEmojiBoxVisibleStr }}
                  className="emoji-box"
                  set="emojione"
                  onSelect={this.handleEmojiPick}
                />
              </div>
              <div className="picture" onClick={this.handlePictureClick}>
                <Icon type="picture" />
              </div>
              <div className="link" onClick={this.handleLinkClick}>
                <Icon type="link" />
              </div>
              <div className="code" onClick={this.handleCodeClick}>
                <Icon type="code" />
              </div>
              <button
                type="submit"
                className="submit"
                name="submit"
              >
                <span style={{ fontSize: "1rem", marginRight: "0.5rem" }}>
                  发布
                </span>
                <Icon type="edit" />
              </button>
            </div>
          </div>
        </div>
        {userData && !userSetting ? (
          <div className="user">
            <div className="edit">
              <strong style={{ marginRight: "1rem" }}>{userData.name}</strong>
              <Popover content={settingContent} placement="bottom">
                <Icon type="setting" />
                <span style={{ marginLeft: "0.5rem" }}>账号设置</span>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="user">
            <div className="name">
              <input
                required="required"
                type="text"
                name="name"
                placeholder="称呼（必填）"
                maxLength="10"
                onInvalid={this.handleInvalidNameMsg}
                value={name}
                onChange={this.onChange}
                // defaultValue={userData && userSetting ? userData.name : null}
              />
            </div>
            <div className="email">
              <input
                required="required"
                type="email"
                name="email"
                placeholder="邮箱（必填，不会公开）"
                maxLength="40"
                onInvalid={this.handleInvalidEmailMsg}
                value={email}
                onChange={this.onChange}
                // defaultValue={userData && userSetting ? userData.email : null}              
              />
            </div>
            <div className="site">
              <input
                type="url"
                name="url"
                placeholder="网站（http, https:// 开头，非必填）"
                maxLength="40"
                onInvalid={this.handleInvalidSiteMsg}
              />
            </div>
            {userSetting ? (
              <div className="save">
                <button
                  type="submit"
                  name="update"
                  // onClick={this.onClickComfirm}
                >
                  <Icon
                    type="check-circle"
                    style={{ fontSize: 20, color: "green" }}
                  />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </form>
    );
  }
}

export default CommentReply;
