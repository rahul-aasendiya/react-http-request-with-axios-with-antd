import React, { Component } from "react";
import axios from "axios";
import "./NewPost.css";
import { Form, Input, Button, Select } from "antd";
const { TextArea } = Input;

const { Option } = Select;

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", data).then((response) => {
      console.log(response);
    });
  };

  handleChange = (value) => {
    // this.setState({ author: value });
    // console.log(this.state.author);
    console.log(value);
  };

  render() {
    return (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.postDataHandler}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input
            placeholder="Title"
            type="text"
            value={this.state.title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please input your Content!" }]}
        >
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 120 }}
            value={this.state.content}
            onChange={(event) => this.setState({ content: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please select your author!" }]}
        >
          <Select value={this.state.author} onChange={this.handleChange}>
            <Option value="Max">Max</Option>
            <Option value="Manu">Manu</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary">Add Post</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default NewPost;
