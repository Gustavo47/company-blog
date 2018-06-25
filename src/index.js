import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Layout } from 'antd';

import Footer from "./components/Footer";
import Header from './components/Header';

import ListPosts from './pages/ListPosts';
import Post      from './pages/Post';
import Login     from './pages/Login';
import Logout    from './pages/Logout';
import Profile   from './pages/Profile';

ReactDOM.render(
<BrowserRouter>
    <Layout className="layout">
        <Header />
        <Switch>
            <Route path="/" exact={true} component={ListPosts} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/logout" exact={true} component={Logout} />
            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/post/:id" exact={true} component={Post} />
        </Switch>
        <Footer />
    </Layout>
</ BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
