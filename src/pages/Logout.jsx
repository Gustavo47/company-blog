import React, { Component } from 'react';

import {  withRouter } from 'react-router-dom';

import Session from '../Session';



class Logout extends Component {

    constructor(props) {
        super(props);

        Session.deleteSession();
        this.props.history.push('/login');
    }
    
    render() {
        return (<div>Logout</div>)       
    }
}


export default withRouter(Logout);
