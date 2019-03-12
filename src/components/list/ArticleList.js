import React, { Component } from 'react'
import { List, Icon } from 'antd';

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

class ArticleList extends Component {
  render() {
    const { articles, handleClickTitle } = this.props;
    return (
        <List
        itemLayout="vertical"
        style={{ background: '#fff', width: '100%'}}
        size="middle"
        dataSource={
          articles
        }
        renderItem={item => (
            <List.Item
                key={item.id}
                actions={[<span>{item.create_time.slice(0, 10)}</span>, <IconText type="read-o" text={item.meta.views} />, <IconText type="like-o" text={item.meta.likes} />, <IconText type="message" text={item.meta.comments} />]}
            >
                {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                    <List.Item.Meta 
                        title={item.title}
                        style={{ cursor: 'pointer'}}
                        onClick={() => handleClickTitle(item.id)}
                    />
                    {/* <div style={{textOverflow: 'ellipsis', width: '400px', wrap: 'nowarp'}}>{item.desc}</div> */}
                    <p className="abstrack">
                      {item.desc}
                    </p>
                {/* </Skeleton> */}
            </List.Item>
        )}
      />
    )
  }
}

export default ArticleList;