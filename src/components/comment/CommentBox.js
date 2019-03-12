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
  setCommentUpdate
} from "../../actions/commentAction";
class CommentBox extends Component {
  componentDidMount() {
    const articleId = this.props.articleId;
    this.props.getComments(articleId);
  }

  onClickComment = data => {
    this.props.clickComment(data);
  };

  render() {
    const { comments, referenceComment, postupdate } = this.props.comment;
    return (
      <div>
        <Divider orientation="left">{comments.length} 条评论</Divider>
        <CommentReply
          reference={referenceComment}
          articleId={this.props.articleId}
          onClickComment={this.props.clickComment}
          onPostComment={this.props.postComment}
        />
        {/* {comments.length > 0 ? <CommentList data={comments} onClickComment={this.props.clickComment} /> : null} */}
        <CommentList
          data={comments}
          onClickComment={this.props.clickComment}
          postupdate={postupdate}
          setCommentUpdate={this.props.setCommentUpdate}
        />
      </div>
    );
  }
}

CommentBox.propTypes = {
  comment: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  clickComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  setCommentUpdate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComments, clickComment, postComment, setCommentUpdate }
)(CommentBox);
