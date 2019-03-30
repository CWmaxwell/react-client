import React, { Component } from 'react';
import { Divider, Icon, Spin } from 'antd';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArticles, getTagName } from '../../actions/articleAction';
import ArticleList from './ArticleList';
import DocumentTitle from 'react-document-title';
// import reqwest from 'reqwest';

class LoadMoreList extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   category: 1,
  //   //   data: [],
  //   // }
  // }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    // console.log(pathname);
    this.props.getArticles(pathname);
    if (pathname && pathname.indexOf('/tag/') !== -1) {
      let id = this.props.match.params.id;
      this.props.getTagName(id, true);
    } else if (pathname && pathname.indexOf('/search/') !== -1) {
      let id = this.props.match.params.id;
      this.props.getTagName(id, false);
    } else {
      this.props.getTagName();
    }
    document.title = ""
    // axios.get(`/api/article/${pathname}`)
    //   .then(res => {this.setState({ data: res.data.data.list }) })
    //   .catch(err => console.log(err))
  }

  clickTitle(id) {
    this.props.history.push(`/article/${id}`)
  }

  getPageTitle = () => {
    const pathname = this.props.location.pathname;
    let title = 'loadinng...';
    if (pathname === '/') {
      title = '码农，游戏，日常 | 银弹';
    } else {
      if (pathname.indexOf('tag') !== -1) {
        title = 'loading....';
      } else {
        title = pathname.slice(1) + ' | 银弹';
      }
    }
    return title;
  }

  render() {
    const { articles, loading, tagName } = this.props.article;
    const titleClass = this.props.location.pathname.split('/')[1];
    let listContent;
    if (articles === null || loading) {
      listContent = <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size="large"/></div>;
    } else {
      listContent = 
        <div style={{width: '100%'}}>
          {tagName ? <Divider orientation="left"><Icon type="tag" style={{marginRight: '0.5rem'}}/>   {tagName}</Divider> : null}
          <ArticleList articles={articles} handleClickTitle={this.clickTitle.bind(this)}/>
        </div>
    }
    return (
      <DocumentTitle title={tagName ? `${tagName} | ${titleClass} | 银弹` : this.getPageTitle()}>
        {listContent}
      </DocumentTitle>
    );
  }
}

LoadMoreList.propTypes = {
  article: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  getTagName: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  article: state.article
})

export default connect(mapStateToProps, { getArticles, getTagName })(withRouter((props) => <LoadMoreList {...props} key={props.location.pathname} />));