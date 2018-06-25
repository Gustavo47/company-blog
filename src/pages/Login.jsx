import React, { Component } from 'react';
import axios from 'axios';

import { Link, withRouter } from 'react-router-dom';

import Config from  '../config';
import Session from '../Session';

import { 
    Layout as Content, 
    Breadcrumb, 
    Spin,
    Card,
    Form, Icon, Input, Button, Checkbox
} from 'antd';
const FormItem = Form.Item;


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({loading: true }, () => {

                axios.get(Config.api + 'users?username=' + values.userName)
                .then(res => {
                    this.setState({loading: false });
                    if(res.data.length === 1) {
                        Session.setSession(res.data[0], values.remember);
                        this.props.history.push('/');
                    } else {
                        alert('Username not found!');
                    }                    
                })
                .catch(() => {
                    alert('Username not found!');
                    this.setState({loading: false });
                });

            });

          }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/login">Login</Link></Breadcrumb.Item>
                </Breadcrumb>

                <div className="Content-Container" >
                    <Spin spinning={this.state.loading} />
                    <Card title="Login">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            
                            <FormItem>
                                {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
                
            </Content>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(Login);

export default withRouter(WrappedHorizontalLoginForm);
