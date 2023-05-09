import React, { PropTypes} from 'react';
import {Form, Button, DatePicker} from 'antd';
import {settlementSearchForm} from './index.css';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;




const SettlementSearchForm = ({ onSearch, form: { getFieldDecorator, validateFields } }) => {
    const onSubmit = (e)=> {
        e.preventDefault();
        validateFields((errors, values)=> {
            if (!!errors) {
                return false;
            }
            if(values['timeRange']){
            	values['timeRange'] = values['timeRange'].map((time)=> time.toLocaleString());
                // TEST
                // console.log(values) // 日期选择：timeRange: ['Wed May 10 2023 23:06:57 GMT+0800', 'Thu May 11 2023 23:06:57 GMT+0800']
                // values['timeRange'].map(time => console.log(time))  // Wed May 10 2023 23:11:37 GMT+0800 / Fri May 12 2023 23:11:37 GMT+0800
                // values['timeRange'].map(time => console.log(time.toLocaleString())) // Thu May 11 2023 23:11:10 GMT+0800 / Fri May 12 2023 23:11:10 GMT+0800
			}
            onSearch(values);
        })
    };

    return (
        <div className={settlementSearchForm}>
            <Form layout='inline' onSubmit={onSubmit}>
                <FormItem>
                    <h2>时间筛选与转化</h2>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('timeRange')(<RangePicker size='large'/>)}
                </FormItem>
                <Button type='primary' htmlType='submit'>搜索</Button>
            </Form>
        </div>
    );
};

SettlementSearchForm.propTypes = {
    form: PropTypes.object,
    onSearch: PropTypes.func,
	customers: PropTypes.array
};

export default Form.create()(SettlementSearchForm);
