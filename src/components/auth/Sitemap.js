import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Tag } from 'antd';
import { black } from 'ansi-colors';
import DocumentTitle from 'react-document-title';
const monthsInEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
class Sitemap extends Component {
    render() {
        let arr = ['Tag1123123', 'Tag223', 'Tag3', 'Tag4','Ta', 'Tag2123', 'Tag3', 'Tag4'];
        let timeArc = [{time: new Date(2018,10,13).getTime(), title: '文章测试1', key: '1'}, {time: new Date(2018,12,13).getTime(), title: '文章测试2', key: '2'}, {time: new Date(2019,1,13).getTime(), title: '文章测试3', key: '3'}]
        let year = null;
        let month = null;
        return (
            <DocumentTitle title='sitemap | 银弹' >
            <div className="sitemap">
                <Divider orientation="left">标签</Divider>
                <div style={{width: '350px', position: 'relative', left: '80px'}}>
                    { arr.map((value, index) => 
                        <Tag key={index} style={{ marginTop: '10px' }}><Link to={`/tag/${value}`}>{value}</Link></Tag>
                    )}
                </div>
                <Divider orientation="left">文章</Divider>
                <div style={{width: '500px', position: 'relative', left: '40px'}}>
                    {   timeArc.reverse().map((value, index) => {
                            let tempDate = new Date(value.time);
                            let articleLi = <div style={{ position: 'relative', left: '80px' }}><p style={{ display: 'inline-block', width: '80px',textAlign: 'left'}}>{tempDate.toLocaleDateString()}</p><Link style={{color: 'black', textDecoration: 'underline'}} to={`/article/${value.key}`}>{value.title}</Link></div>
                            if (tempDate.getFullYear() !== year) {
                                year = tempDate.getFullYear();
                                month = tempDate.getMonth();
                                return (
                                    <div key={index} >
                                        <div style={{ fontSize: '25px', fontWeight: '800'}}>{tempDate.getFullYear() + '年'}</div>
                                        <div style={{ fontSize: '20px', fontWeight: '600', position: 'relative', left: '40px' }}>{monthsInEng[month]}</div>
                                        {articleLi}
                                    </div>
                                )
                            } else {
                                if (tempDate.getMonth() !== month) {
                                    month = tempDate.getMonth();
                                    return (
                                        <div key={index}>
                                            <div style={{ fontSize: '20px', fontWeight: '600', position: 'relative', left: '40px' }}>{monthsInEng[month]}</div>
                                            {articleLi}
                                        </div>
                                    )
                                } else {
                                    return (
                                        {articleLi}
                                    )
                                }
                            }
                        }
                    )}
                </div>
            </div>
            </DocumentTitle>
        );
    }
}

export default Sitemap;