import React, { Component } from "react";
import { Button, Form, Input, message } from "antd";
import { add } from "../../api/role";

/***--- 添加角色表单 ---**/
class AddFrom extends Component {
  save = (data) => {
    // console.log(data)
    // return
    add({ roleName: data.name }).then((res) => {
      if (res.status === 0) {
        message.success("添加成功");
        this.props.handleCancel(); // 关闭弹框
        this.props.init(); // 重新获取所有角色名称
      }
    });
  };

  render() {
    return (
      <Form layout="vertical" onFinish={this.save}>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: "请输入角色名称" }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item>
          <Button onClick={this.props.handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddFrom;
