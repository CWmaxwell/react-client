import './marked.css';
import React, { Component } from 'react'
import marked from 'marked';
import DocumentTitle from 'react-document-title';
import { Spin } from 'antd'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArticle } from '../../actions/articleAction';
import hljs from 'highlight.js';
import Aside from './Aside';
import ArticleShare from './ArticleShare';
import CommentBox from '../comment/CommentBox';
class Article extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articleDetail: {
  //       content: '# Marked in the browser\n\nRendered by **marked**. ![Alt text](https://raw.githubusercontent.com/CWmaxwell/test_git2/master/picture/hw7/three.png)',
  //     }
  //   }
  // }

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

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getArticle(id);
  }

  render() {
    const { article, loading } = this.props.article;
    let articleContent
    if (article === null || loading) {
      articleContent = <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size="large"/></div>;
    } else {
      const time = article.create_time;
      articleContent = 
        <div style={{ background: '#fff', width: '100%'}}>
          <h3 className="article-title">{article.title}</h3>
          <div className="meta">
              <span className="time">{time.slice(0, 9)} </span>
              <span className="num">字数 {article.numbers}</span>
              <span className="view">阅读 {article.meta.views}</span>
              <span className="like">喜欢 {article.meta.likes}</span>
              <span className="comment">评论 {article.meta.comments}</span>
          </div>
          <div className="article-content">
            <div
              id="content"
              className="article-detail"
              dangerouslySetInnerHTML={{
                __html: article.content ? marked(article.content) : null,
              }}
            />
          </div>
          <ArticleShare tags={article.tags} likes={article.meta.likes} />
          <CommentBox articleId={this.props.match.params.id}/>
          <Aside />
      </div>
    }
    return (
      <DocumentTitle title={article? article.title : 'loading...'}>
        {articleContent}
      </DocumentTitle>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  article: state.article
})

export default connect(mapStateToProps, { getArticle })(withRouter(Article));