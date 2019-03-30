import React, { Component } from "react";
import { Divider } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CommentReply from "./CommentReply";
import CommentList from "./CommentList";
import {
  getComments,
  clickComment,
  postComment,
  setCommentUpdate,
  setCurrentUser,
  likeComment
} from "../../actions/commentAction";
import { updateUser } from "../../actions/authAction";
import store from "../../store";
class CommentBox extends Component {
  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user !== "undefined" && user !== null) {
      const storeUser = JSON.parse(user);
      store.dispatch(this.props.setCurrentUser(storeUser));
    }
    const articleId = this.props.articleId;
    this.props.getComments(articleId);
  }

  // onClickComment = data => {
  //   this.props.clickComment(data);
  // };

  onClickLike = data => {
    this.props.likeComment(data);
  }

  setCurrentUser = user => {
    store.dispatch(this.props.setCurrentUser(user));
  };

  render() {
    const {
      articleId,
      refComment,
      clickComment,
      likeComment,
      postComment,
      updateUser,
      comment,
      auth,
      updateArticleComments,
      setCommentUpdate,
    } = this.props;
    const { comments, referenceComment, postupdate } = comment;
    const { user } = auth;
    return (
      <div ref={refComment} className="comment-box">
        <Divider orientation="left">{comments.length} 条评论</Divider>
        <CommentReply
          reference={referenceComment}
          articleId={articleId}
          onClickComment={clickComment}
          onPostComment={postComment}
          userData={user}
          setCurrentUser={this.setCurrentUser}
          updateUser={updateUser}
          updateArticleComments={updateArticleComments}
        />
        {/* {comments.length > 0 ? <CommentList data={comments} onClickComment={this.props.clickComment} /> : null} */}
        <CommentList
          data={comments}
          onClickComment={clickComment}
          onClickLike={likeComment}
          postupdate={postupdate}
          userData={user}
          setCommentUpdate={setCommentUpdate}
        />
      </div>
    );
  }
}

CommentBox.propTypes = {
  comment: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  clickComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  setCommentUpdate: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getComments,
    clickComment,
    likeComment,
    postComment,
    setCommentUpdate,
    setCurrentUser,
    updateUser
  }
)(CommentBox);
