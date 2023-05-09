import React, {Component, PropTypes} from 'react';
import {Table, Pagination} from 'antd';
// import dateFormat from '../../../utils/dateFormat';
import {PAGE_SIZE} from '../../../constants/constants';
// import Spliter from '../../Spliter/Spliter';
import numberFormat from '../../../utils/numberFormat';
import * as moment from 'moment';
import {settlementList} from './index.css';




class SettlementList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectId: ''
		};
		this.columns = [
			{
				title: '序号',
				dataIndex: 'serialNumber',
				key: 'serialNumber',
				render: (text, record, index) => <span>{index + 1}</span>
			},
			{
				title: '结算日期',
				dataIndex: 'createInstance',
				key: 'createInstance',
				width: '30%',
				render: (text) => {
                    // console.log(text) // 2023-04-07T02:03:30.621Z
                    // console.log(moment.parseZone(text).local().format('YYYY-MM-DD HH:mm')) // 2022-10-20 19:28
                    return <span>{moment.parseZone(text).local().format('YYYY-MM-DD HH:mm')}</span>
                }
			},
			{
				title: '结算金额',
				dataIndex: 'settlementAmount',
				key: 'settlementAmount',
				width: '30%',
				render: (text, record, index) => {
                    // console.log(text) // -13850
                    // console.log(numberFormat(text)) // "-13,850.00"
                    // text(numer): -13850 -->   numberFormat(text)(string): "-13,850.00"
                    return numberFormat(text)
                }
			},
			{
				title: '结算操作员',
				dataIndex: 'userName',
				key: 'userName'
			},

		];
	}

    // TODO: 指定传参属性
	static propTypes = {
		onSettlementSelect: PropTypes.func,
		onPageChange: PropTypes.func,
		dataSource: PropTypes.array,
		loading: PropTypes.any,
		total: PropTypes.any,
		current: PropTypes.any
	};

	onRowSelect = (record, index) => {
		const {onSettlementSelect} = this.props;
		const recordId = record._id;
		if (recordId !== this.state.selectId) {
			this.setState({
				selectId: recordId
			});
			onSettlementSelect(recordId);
		}
	};

	onPageChange = (page) => { const {onPageChange} = this.props; onPageChange(page) }

	componentWillReceiveProps(nextProps) {
		const {onSettlementSelect, settlementId} = nextProps;
		if (settlementId !== this.state.selectId) {
			this.setState({
				selectId: settlementId
			}, () => onSettlementSelect(this.state.selectId));
		}
	}

	render() {
		const {
			total,
			current,
			loading,
			dataSource
		} = this.props;
		return (
			<div className={settlementList}>
                <h3>双击行后，底部结算商品明细显示数据</h3>
                <br />
                <h3>静态属性：static propTypes=｛｝</h3>
                <br />
                <h3>钩子：componentWillReceiveProps(nextProps)｛｝</h3>
                <br />
                <h3>格式化时间：2023-04-07T02:03:30.621Z --?  2022-10-20 19:28  ｛moment.parseZone(text).local().format('YYYY-MM-DD HH:mm')｝</h3>
                <br />
                <h3>格式化金钱：text(numer): -13850 --?   numberFormat(text)(string): "-13,850.00"</h3>
                <br />
                <h3>分页：onPageChange = (page) =? ｛const ｛onPageChange｝ = this.props; onPageChange(page)｝ </h3>
				<Table
					columns={this.columns}
					dataSource={dataSource}
					loading={loading}
					rowKey={record => record._id}
					pagination={false}
					onRowClick={this.onRowSelect}
					rowClassName={(record, index) => record._id === this.state.selectId ? 'ant-table-row-select' : ''}
				/>
				<Pagination
					className="ant-table-pagination"
					total={total}
					current={parseInt(current)}
					pageSize={PAGE_SIZE}
					onChange={this.onPageChange}
				/>
			</div>
		)
	}
}

export default SettlementList;
