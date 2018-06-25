import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Session from '../Session';

import { 
    Layout as Content, 
    Breadcrumb, 
    Card
} from 'antd';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: Session.getSession()
        };

    }
    
    render() {

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/profile">Profile</Link></Breadcrumb.Item>
                </Breadcrumb>

                <div className="Content-Container Content-Profile" >
                    <Card title="Profile">
                        <div><strong>ID: </strong> {this.state.profile.id} </div>
                        <div><strong>Name: </strong> {this.state.profile.name} </div>
                        <div><strong>Phone: </strong> {this.state.profile.phone} </div>
                        <div><strong>Username: </strong> {this.state.profile.username} </div>
                        <div><strong>Website: </strong> {this.state.profile.website} </div>
                        <div><strong>Address: </strong> {this.state.profile.address.street + ' ' + this.state.profile.address.suite + ' - ' + this.state.profile.address.city} </div>
                        <div><strong>Company: </strong> {this.state.profile.company.name} </div>
                    </Card>
                </div>
                
            </Content>
        );
    }
}

export default Profile;
