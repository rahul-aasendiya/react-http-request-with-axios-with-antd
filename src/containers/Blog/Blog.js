import React, { Component } from "react";
// import axios from 'axios';
import axios from "../../axios";

import { Col, Row, Card } from "antd";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Col key={post.id} span={4}>
            <Post
              bordered={false}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Col>
        );
      });
    }

    return (
      <div>
        <div className="site-card-wrapper">
          <Row gutter={16}>{posts}</Row>
        </div>
        <div className="site-card-wrapper">
          <Card title="Post Details">
            <FullPost id={this.state.selectedPostId} />
          </Card>
        </div>
        <div className="site-card-wrapper">
          <Card title="Add Post">
            <NewPost />
          </Card>
        </div>
      </div>
    );
  }
}

export default Blog;
