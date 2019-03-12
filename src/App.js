import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sitemap from './components/auth/Sitemap';
import LoadMoreList from './components/list/LoadMoreList';
import Article from './components/article/Article';
import { Layout, BackTop } from 'antd';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';


const { Content} = Layout;

class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Layout className="layout">
              <Navbar />
              <Content className='main-container'>
                
                {/* <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div> */}
                <Switch>
                  <Route exact path="/sitemap" component={Sitemap} />
                  {/* <Route exact path="/article" component={Article} /> */}
                  <Route path="/(|code|game|other)/" component={LoadMoreList} />
                  <Route path="/tag/:id" component={LoadMoreList} />
                  <Route path="/article/:id" component={Article} />
                </Switch>
                {/* <LoadMoreList /> */}
              </Content>
              <Footer />
            </Layout>
            <BackTop style={{right: '10px'}} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
