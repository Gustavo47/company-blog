import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Config from  '../config';
import Comments from '../components/Comments';

import { 
    Layout as Content, 
    Breadcrumb, 
    Spin,
    Card,
} from 'antd';


class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            post: {},
            comments: [],
            loading: true
        };

    }

    componentDidMount() {
        axios.get(Config.api + 'posts/' + this.state.id)
        .then(res => {
            const post = res.data;
            this.setState({ post: post });

            axios.get(Config.api + 'comments?postId=' + this.state.id)
            .then(res => {
                const comments = res.data.map(obj => obj);
                this.setState({ comments: comments, loading: false  });
            });
        });
        
    }
    
    render() {
        const comments = this.state.post.id ? <Comments postId={this.state.post.id} /> : false;

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Posts</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/posts/" + this.state.id}>{this.state.post.title}</Link></Breadcrumb.Item>
                </Breadcrumb>

                <div className="Content-Container" >
                    <Spin spinning={this.state.loading} />
                    <Card title={this.state.post.title}>
                        <article>
                            <p>{this.state.post.body}</p>                    
                        </article>
                        <br/>
                        <br/>
                        {comments}
                    </Card> 
                </div>
                
            </Content>
        );
    }
}



export default Post;
