import React, {Component} from 'react';
import {Form, Input, Select, Button} from 'antd';
import PropTypes from 'prop-types'
import './index.less'





class AddFrom extends Component {
    static propTypes = {
        add: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
        selectCategoryList: PropTypes.array.isRequired
    }
    save = (data) => {
        // 修改属性名字 categoryName
        data = JSON.parse(JSON.stringify(data).replace(/name/g, "categoryName"));
        this.props.add(data)
    }

    render() {
        let {selectCategoryList, parentId} = this.props;
        return (
            <Form
                layout="vertical"
                initialValues={{parentId: parentId}}
                onFinish={this.save}
            >
                <Form.Item
                    label="所属分类"
                    name="parentId"
                >
                    <Select>
                        <Select.Option value={0}>一级分类</Select.Option>
                        {
                            selectCategoryList.map(category => {
                                return <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="分类名称"
                    name="name"
                    rules={[{required: true, message: '请输入分类名称'}]}
                >
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                    <Button type="primary" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default AddFrom;