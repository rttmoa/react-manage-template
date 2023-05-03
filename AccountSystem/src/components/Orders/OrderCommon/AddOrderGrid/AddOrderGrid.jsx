import React, {Component} from 'react';
import {Table, Popconfirm, Icon, message} from 'antd';
import EditableCell from '../../../EditableCell/EditableCell';
import ListEditableCell from '../../../ListEditableCell/ListEditableCell';
import Spliter from '../../../Spliter/Spliter';
import {addOrderGrid, rowClassName, totalAmountClass, paymentAmountClass} from './index.css';


class AddOrderGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.products,          // Table数据
            count: 1,  // 表格中List的数量
            totalAmount: this.props.totalAmount,      // 合计金额
            paymentAmount: this.props.paymentAmount,  // 支付金额
            remarks: '' // 备注
        };
        let disabled = this.props.disabled || false;
        const {productList} = this.props;
        this.columns = [
            {
                title: '序号',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index)=><span>{index + 1}</span>
            },
            {
                title: '操作',
                key: 'operation',
                render: (text, record, index)=>(
                    !disabled ? (
                        <p style={{textAlign: 'center'}}>
                            <a type='ghost' onClick={this.handleAdd.bind(this)}><Icon type="plus"/></a>
                            <Spliter spliterText="|" />
                            <Popconfirm title="确定删除该条记录？" onConfirm={this.onDelete(index)}>
                                <a type='ghost'><Icon type="minus"/></a>
                            </Popconfirm>
                        </p>
                    ) : null
                )
            },
            {
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',
				width: '20%',
                render: (text, record, index) => (
                    // 封装下拉框组件
                    <ListEditableCell
                        disabled={disabled}
                        editType='editCell'
						componentType='combo'
						productList={productList}
                        value={{key: record['productId'], label: text}}
                        onChange={this.onListCellChange(index, 'productName')}
                    />
                )
            },
            {
                title: '数量',
                dataIndex: 'quantity',
                key: 'quantity',
				width: '10%',
                render: (text, record, index) => (
					record.productId !== undefined && record.productId !== '' ?
                    <EditableCell
						fieldType="number"
                        disabled={disabled}
                        editType='editCell'
                        value={text}
                        onChange={this.onLinkCellChange(index, 'quantity')}
					/> : <span>{text}</span>
                )
            },
            {
                title: '单位',
                dataIndex: 'productUnit',
                key: 'productUnit',
                /*render: (text, record, index)=>(
                    <EditableCell
                        disabled={disabled}
                        editType='editCell'
                        value={text}
                        onChange={this.onCellChange(index, 'productUnit')}
                    />
                )*/
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
				width: '10%',
                render: (text, record, index)=>(
                    <EditableCell
						fieldType="number"
                        disabled={disabled}
                        editType='editCell'
                        value={text}
                        onChange={this.onLinkCellChange(index, 'price')}
                    />
                )
            },
            {
                title: '金额 / 元',
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
				width: '20%',
                render: (text, record, index) => (
                    <EditableCell
						fieldType="text"
                        disabled={disabled}
                        editType='editCell'
                        value={text}
                        onChange={this.onCellChange(index, 'remarks')}
                    />
                )
            }
        ];
    }

    // Table 添加备注
    onCellChange(index, key) {
        const {editProducts} = this.props;
        const {totalAmount, paymentAmount} = this.state;
        return (value)=> {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({dataSource});
            editProducts(dataSource, totalAmount, paymentAmount);
        }
    }

    // Table 选择商品名称 / 下拉选择值
    onListCellChange(index, key){
		const {editProducts} = this.props;
		const {totalAmount, paymentAmount} = this.state;
		return ({key, label})=> {
			const dataSource = [...this.state.dataSource];
			const arr = label.match(/([\u4e00-\u9fa5\w]+)/g);
            if(key!==''&&arr!==null){
                dataSource[index]['productId'] = key;
                dataSource[index]['productName'] = arr[0];
                dataSource[index]['productUnit'] = arr[1];
                this.setState({dataSource:[...dataSource]});
                editProducts(dataSource, totalAmount, paymentAmount);
            }
		}
	}

    // Table 输入数量 / 单价
    onLinkCellChange(index, key) {
        const {editProducts, productList} = this.props;
        const {paymentAmount} = this.state;
        return (value)=> {
            let dataSource = [...this.state.dataSource];
            let record = dataSource[index];
            if (key === 'quantity') {
                let price = record.price;
				let selectProduct = productList.filter(product=> product._id===record.productId)[0];
				/*如果输入的产品数量大于库存量，则给出提示*/
                if(value>selectProduct.amount){
					message.error(`商品数量不能大于当前库存量: ${selectProduct.amount}！`);
					value=0;
				}
                if (price !== null) {
                    record.amount = (value*price).toFixed(2)*1;
                }
            } else if (key === 'price') {
                let quantity = record.quantity;
                if (quantity !== null) {
                    record.amount = (value*quantity).toFixed(2)*1;
                }
            }
            record[key] = value;
            this.setState({dataSource});
            let totalAmount = this.getTotalAmount();
            this.setState({totalAmount});
            editProducts(dataSource, totalAmount, paymentAmount);
        }
    }
    // 获取总价 金额/天
    getTotalAmount() {
        const dataSource = [...this.state.dataSource];
        let totalAmount = 0;
        dataSource.map((data, index)=> totalAmount += data['amount']);
        return totalAmount;
    }

    // Table 删除Item项目
    onDelete(index) {
        const {editProducts} = this.props;
        const {totalAmount, paymentAmount} = this.state;
        return () => {
            const dataSource = [...this.state.dataSource];
            if(dataSource.length>1){
				dataSource.splice(index, 1);
				this.setState({dataSource});
				editProducts(dataSource, totalAmount, paymentAmount);
			}else {
            	return false;
			}

        }
    }

    // Table 新增Item项目
    handleAdd() {
        let {dataSource, count} = this.state;
        let newData = {
            key: count,
            productId: '',
            productName: '',
            quantity: 0,
            productUnit: '',
            price: 0,
            amount: 0,
            remarks: ''
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        });
    }

    // Footer 支付金额
    handlePaymentAmount() {
        const {editProducts} = this.props;
        const {dataSource, totalAmount} = this.state;
        return (paymentValue) => {
            this.setState({
                paymentAmount: paymentValue
            });
            editProducts(dataSource, totalAmount, paymentValue);
        };
    }


    render() {
        let {dataSource, totalAmount, paymentAmount} = this.state;
        let columns = this.columns;
        let {disabled} = this.props;
        return (
            <div className={addOrderGrid}>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    footer={() =>
                        <div className={totalAmountClass}>
                            <div>合计金额：￥{totalAmount}</div>
                            <div className={paymentAmountClass}>
                                支付金额：￥
                                <EditableCell
                                    disabled={disabled}
                                    fieldType="number"
                                    editType='editLine'
                                    onChange={this.handlePaymentAmount()}
                                    value={paymentAmount}
                                />
                            </div>
                        </div>
                    }
                    size="small"
                    rowClassName={() => rowClassName}
                />
            </div>
        );
    }

}

/*AddOrderGrid.propTypes = {
 onPageChange: PropTypes.func,
 onModify: PropTypes.func,
 onDel: PropTypes.func,
 dataSource: PropTypes.array,
 loading: PropTypes.any,
 total: PropTypes.any,
 current: PropTypes.any
 };*/

export default AddOrderGrid;
