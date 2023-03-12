import React, {Component} from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'

class UpdateFrom extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired,
        getFromDate: PropTypes.func.isRequired
    }

    render() {
        const {name, _id} = this.props.category || "";
        const {getFromDate} = this.props;
        // 得到 Form 实例
        return (
            <Form
                layout="vertical"
                initialValues={{name: name}}
            >
                <Form.Item
                    label="分类名称"
                    name='name'
                    rules={[{required: true, message: '请输入分类名称!'}]}
                >
                    {/*通过函数回调子给父传递数据*/}
                    <Input onChange={event => getFromDate({categoryId: _id, categoryName: event.target.value})}
                           placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        );
    }
}

export default UpdateFrom;