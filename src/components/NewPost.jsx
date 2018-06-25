import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

import Config from  '../config';
import Session from '../Session';

import { 
    Card,
    Form, Icon, Input, Button
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newPost = {
                    userId: Session.getSession().id,
                    title: values.title,
                    body: values.content
                };

                axios.post(Config.api + 'posts', newPost)
                .then(res => {
                    if(res.data) {
                        this.props.onNewpost(res.data);
                        this.props.form.resetFields();
                        alert('Post saved!');
                    } else {
                        throw 'Error';
                    }
                })
                .catch(() => {
                    alert('Error on save the new post!');
                });
             }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Content-NewPost" >
                <Card title="New Post">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title!' }],
                            })(
                                <Input prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input the content!' }],
                            })(
                                <TextArea prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} autosize={{ minRows: 5, maxRows: 100 }} placeholder="Content" />
                            )}
                        </FormItem>
                        
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Post It!
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
                <br />
            </div>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(Login);

export default withRouter(WrappedHorizontalLoginForm);
