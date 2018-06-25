
import { Layout as HeaderLayout, Menu } from 'antd';

import React from 'react';

import Logo from './Logo';

import { Link } from 'react-router-dom'
import Session from '../Session';

const Header = (props) => {

    const loginLogout = Session.getSession() 
    ? <Menu.Item key="2"><Link to="/logout">Logout</Link></Menu.Item>
    : <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>;
    
    const profile = Session.getSession()
    ? <Menu.Item key="3"><Link to="/profile">Profile</Link></Menu.Item>
    : false;
    return (
        <HeaderLayout mode="horizontal" >
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="0" disabled={true}><Logo /></Menu.Item>
                <Menu.Item key="1"><Link to="/">Posts</Link></Menu.Item>
                {loginLogout}
                {profile}
            </Menu>
        </HeaderLayout>

    );
}

export default Header;