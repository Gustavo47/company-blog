import React, { Component } from 'react';
import axios from 'axios';

import { 
    Layout as Content, 
    Breadcrumb, 
    Spin,
    List,
    Card,
} from 'antd';

import { Link } from 'react-router-dom';

import NewPost from '../components/NewPost';

import Config  from  '../config';
import Session from  '../Session';

class ListPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
        let loggedUser = '';
        const user = Session.getSession();
        if(user) {
            loggedUser = '?userId=' + user.id;
        }

        axios.get(Config.api + 'posts' + loggedUser)
        .then(res => {
            const posts = res.data.map(obj => Object.assign(obj, {comments: 'counting'}));
            this.setState({ posts: posts, loading: false  });
            if(user) {
                this.countPostsComments();
            }
        });
    }

    countPostsComments(posts) {
        let runningPosts = (posts) ? posts : this.state.posts.slice();

        const post = runningPosts.shift();
        if(!post) {
            return false;
        }

        axios.get(Config.api + 'comments?postId=' + post.id)
        .then(res => {
            const commentsCount = res.data.length;
            const postWithCount = Object.assign(post, { comments: commentsCount });

            const newPosts = this.state.posts.map((item) => {
                if(item.id === postWithCount.id && item.title === postWithCount.title) { // It is needed to compare with title because the fake api return the same id on new posts
                    return postWithCount
                }
                return item;
            });

            this.setState( { posts: newPosts }, () => {
                this.countPostsComments(runningPosts);
            } );
        });
        
    }

    onNewpost(newPost) {
        const newPostPrepared = Object.assign(newPost, {comments: 'counting'});
        this.setState({posts: [newPostPrepared, ...this.state.posts]}, () => {
            this.countPostsComments([newPostPrepared]);
        });

        // Here we may reload the comments, but the fake API does not actually save
    }
    
    render() {
        const newPost = Session.getSession() ? <NewPost onNewpost={this.onNewpost.bind(this)} /> : <div></div>;
        const user = Session.getSession();

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Posts</Breadcrumb.Item>
                </Breadcrumb>

                <div className="Content-Container" >
                    {newPost}
                    <Spin spinning={this.state.loading} />
                    <div>
                        Posts count: {this.state.posts.length}
                    </div>
                    <br />
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                        dataSource={this.state.posts}
                        renderItem={item => (
                            <List.Item>
                                <Link to={"/post/" + item.id}>
                                    <Card title={item.title}>
                                        {item.body.substr(0, 100)}...
                                        <br/>
                                        <br/>
                                        <span style={{display: user ? 'block' : 'none'}}>Comments: {item.comments}</span>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
                
            </Content>
        );
    }
}

export default ListPosts;
