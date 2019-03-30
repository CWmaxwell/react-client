import React from 'react'
import { Layout, Divider } from 'antd';
import { Link } from 'react-router-dom';
const { Footer } = Layout;
export default function MyFooter() {
  return (
    <Footer style={{ textAlign: 'center', background: '#fff', borderTop: '2px solid #e8e8e8' }}>
        <div>
            <Link to="/about">我</Link><Divider type="vertical" /><Link to="/sitemap">归档</Link>
        </div>
        <div>
            个人博客 @2019 Created by chenw247
        </div>      
    </Footer>
  )
}
