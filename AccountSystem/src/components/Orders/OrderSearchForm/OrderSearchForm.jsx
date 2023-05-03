import React, {Component, PropTypes} from 'react';
import {Form, Input, Select, Button, DatePicker} from 'antd';
import {orderSearchForm} from './index.css';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;






const OrderSearchForm = ({
	onSearch,
	customers,
	form: {
		getFieldDecorator,
		getFieldsValue,
		validateFields
	}
}) => {
	const onSubmit = (e) => {
		e.preventDefault();
		validateFields((errors, values) => {
			if (!!errors) {
				return false;
			}
            // console.log("Search-Value", values)
                // {timeRange: Array(2), customerId: '640d74a80a0f744698d3ea96', orderNumber: 'aaaa'}
                // timeRange: ['Wed May 03 2023 23:18:08 GMT+0800', 'Thu May 04 2023 23:18:08 GMT+0800']
			if (values['timeRange']) {
				values['timeRange'] = values['timeRange'].map((time) => time.toLocaleString());
			}
			onSearch(values);
		})
	};

	return (
		<div className={orderSearchForm}>
			<Form layout='inline' onSubmit={onSubmit}>
				<FormItem>
					{getFieldDecorator('timeRange')(<RangePicker size='large'/>)}
				</FormItem>
				<FormItem label="客户名称：">
					{getFieldDecorator('customerId')(
                        <Select style={{minWidth: 150}}>
                            {customers.map(({_id, customerName}) => (
                                <Option key={_id}>{customerName}</Option>
                            ))}
                        </Select>
                    )}
				</FormItem>
				<FormItem label="订单编号：">
					{getFieldDecorator('orderNumber')(
                        <Input type="text"/>
                    )}
				</FormItem>
				<Button type='primary' htmlType='submit'>搜索</Button>
			</Form>
		</div>
	);
};

OrderSearchForm.propTypes = {
	form: PropTypes.object,
	onSearch: PropTypes.func,
	customers: PropTypes.array
};

export default Form.create()(OrderSearchForm);
