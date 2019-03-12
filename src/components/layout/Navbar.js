import React, { Component } from 'react';
import { Input, Layout, Menu, Drawer } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { Header } = Layout;
class Navbar extends Component {
    render() {
        return (
            <Header style={{ padding: '0', display: 'flex', justifyContent: 'space-between', background: '#fff', alignItems: 'center', borderBottom: '1px solid #e8e8e8'}}>
            {/* <div style={{ padding: '0', display: 'flex', justifyContent: 'space-between', background: '#fff', alignItems: 'center', borderBottom: '1px solid #e8e8e8'}} >  */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    selectedKeys={[this.props.history.location.pathname]}
                    style={{ lineHeight: '64px', flexBasis: 272 }}
                >
                    <Menu.Item key="/"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="/code"><Link to="/code">码农</Link></Menu.Item>
                    <Menu.Item key="/game"><Link to="/game">游戏</Link></Menu.Item>
                    <Menu.Item key="/other"><Link to="/other">日常</Link></Menu.Item>
                </Menu>
                <div className="logo">
                    <Link to="/">
                        <img src={require("../../resource/image/logo.png")} alt="logo" style={{ width: '32px', height: '32px' }}/>
                    </Link>
                </div>
                <Input.Search 
                    placeholder="input search text"
                    onSearch={value =>  { console.log(this.props.history)}}
                    enterButton 
                    style={{ width: '200px', height: "40px", flexBasis: 272}}
                />
            {/* </div>  */}
            </Header>
        );
    }
};

export default withRouter(Navbar);