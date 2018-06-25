import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Config from  '../config';

import { 
    Spin,
    Form, Icon, Input, Button
} from 'antd';
const FormItem = Form.Item;


class NewComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.postId,
            loading: false
        };

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const newComment = {
                postId: this.state.id,
                name: values.name,
                email: values.email,
                body: values.comment,
            };

            this.setState({loading: true }, () => {

                axios.post(Config.api + 'comments', newComment)
                .then(res => {
                    this.props.onNewComment(res.data);
                    this.setState({ loading: false  });
                    
                    this.props.form.resetFields();
                });

            });

          }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Content-NewComment">
                <h2>Leave your Comment</h2>

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>   
                    {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(                             
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })( 
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('comment', {
                            rules: [{ required: true, message: 'Please input your comment!' }],
                        })( 
                        <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your Comment" />
                    )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                        Send
                    </Button>
                    </FormItem>
                </Form>
                <br />
                <Spin spinning={this.state.loading} />
                <br />
            </div>
        );
    }
}

const WrappedForm = Form.create()(NewComment);

export default WrappedForm;
