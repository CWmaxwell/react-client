import React, { Component } from "react";
import { Divider } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CommentReply from "./CommentReply";
import CommentList from "./CommentList";
import {
  getComments,
  clickComment,
  postComment
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
    const { comments, referenceComment } = this.props.comment;
    return (
      <div>
        <Divider orientation="left">{comments.length} 条评论</Divider>
        <CommentReply
          reference={referenceComment}
          articleId={this.props.articleId}
          onClickComment={this.props.clickComment}
          onPostComment={this.props.postComment}
        />
        <CommentList data={comments} onClickComment={this.props.clickComment} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  comment: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  clickComment: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComments, clickComment, postComment }
)(CommentBox);