import React, { Component } from 'react';
import axios from 'axios';

import Config from  '../config';

import { 
    Spin,
    List,
    Card,
} from 'antd';


import NewComment from '../components/NewComment';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.postId,
            comments: [],
            loading: true
        };

    }

    componentDidMount() {
        axios.get(Config.api + 'comments?postId=' + this.state.id)
            .then(res => {
                const comments = res.data.map(obj => obj);
                this.setState({ comments: comments, loading: false  });
            });        
    }
    
    onNewComment(comment) {
        const comments = [comment, ...this.state.comments];
        this.setState({ comments: comments, loading: false  });
    }

    render() {
        return (
            <div className="Content-Comments">
                
                <Card 
                    title="Comments"
                    type="inner"
                    >
                    <NewComment postId={this.props.postId} onNewComment={this.onNewComment.bind(this)} />
                    
                    <br />
                    <Spin spinning={this.state.loading} />
                    <br />
                    <List
                        className="Comments"
                        itemLayout="horizontal"
                        dataSource={this.state.comments}
                        renderItem={item => (
                        <List.Item actions={[<a href={"mailto:" + item.email}>{item.email}</a>]}>
                            <List.Item.Meta
                            title={item.name}
                            description={item.body}
                            />
                        </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default Comments;
