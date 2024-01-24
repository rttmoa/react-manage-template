import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    // 调用（res是接口结果）： Utils.pagination(res, (current) => { this.params.page = current; this.requestList(); })
    pagination(data, callback) {
        return {
            // 页码改变的回调，参数是改变后的页码及每页条数
            onChange: (page, pageSize) => {
                console.log("change", page, pageSize)
                callback(page);
            },
            // pageSize 变化的回调
            onShowSizeChange: (current, size) => {
                console.log("onShowSizeChange", current, size)
            },
            // defaultCurrent: 1,
            // defaultPageSize: 10,
            hideOnSinglePage: true, // 只有一个隐藏分页器
            current: data.result.page,
            pageSize: data.result.page_size,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
            total: data.result.total_count,
            showTotal: () => {
                return `共 ${data.result.total_count} 条`;
            },
            showQuickJumper: true,
            showSizeChanger: true,
        };
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || ' km';
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || ' m';
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = []; //[<Option value="0" key="all_key">全部</Option>];
        data.map(item => {
            options.push(
                <Option value={item.id} key={item.id}>
                    {item.name}
                </Option>
            );
        });
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows,
            });
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows,
            });
        }
    },
};
