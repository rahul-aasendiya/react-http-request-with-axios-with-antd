import React, { Component } from "react";
import axios from "axios";
import { Button, Divider, Typography, Row, Col, Card } from "antd";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios.get("/posts/" + this.props.id).then((response) => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.id).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = (
      <Divider>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Please select a Post
        </h1>
      </Divider>
    );
    if (this.props.id) {
      post = (
        <Divider>
          <h1 style={{ textAlign: "center" }}>Loading...!</h1>
        </Divider>
      );
    }
    if (this.state.loadedPost) {
      post = (
        <div>
          <Typography.Title>{this.state.loadedPost.title}</Typography.Title>
          <Typography.Paragraph>
            {this.state.loadedPost.body}
          </Typography.Paragraph>

          <Button
            type="danger"
            onClick={this.deletePostHandler}
            className="Delete"
          >
            Delete
          </Button>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
