import React, { Component } from 'react'
import { Icon } from 'antd'
import { underline } from 'ansi-colors';
import { Link } from 'react-router-dom';
class ArticleShare extends Component {
  render() {
    const { tags, likes } = this.props;
    let tagContent = <span style={{marginLeft: '2rem'}}>该文章没有标签</span>
    if (tags && tags.length !== 0) {
        tagContent = tags.map((tag, index) => (
            <span key={tag.create_time} style={{marginLeft: '2.5rem', fontSize: 18, textDecoration: 'underline'}}><Icon type="tag"/> <Link to={`/tag/${tag._id}`} style={{color: '#b3b3b3'}}>{tag.name}</Link></span>
        ))
    }
    return (
      <div style={{ margin: '3rem 0', padding: '1.5rem 0' }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: '#b3b3b3'}} >
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{cursor: 'pointer', fontSize: 18}}><Icon type="heart" theme="twoTone" twoToneColor='#eb2f96'/>   <span style={{marginLeft: '1rem'}}>{likes}</span></span>
                {tagContent}
            </div>
        </div>
      </div>
    )
  }
}

export default ArticleShare;