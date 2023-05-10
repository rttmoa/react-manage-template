import React, {Component, PropTypes} from 'react';
import {Table, Popconfirm, Icon, message} from 'antd';
import EditableCell from '../../../EditableCell/EditableCell';
import ListEditableCell from '../../../ListEditableCell/ListEditableCell';
import Spliter from '../../../Spliter/Spliter';
import {addOrderGrid, rowClassName, totalAmountClass, paymentAmountClass} from './index.css';








// TODO: 表单内数据处理
// FIXME: 表单内数据处理
class AddOrderGrid extends Component {
    // TODO: constructor 构造函数
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.products,            // Table数据
            count: 1,                                   // 表格中List的数量
            totalAmount: this.props.totalAmount,        // 合计金额
            paymentAmount: this.props.paymentAmount,    // 支付金额
            remarks: ""||"",                            // 备注
        };
        let disabled = this.props.disabled || false;
        const {productList} = this.props;
        // console.log(productList) // 商品： [{…}]
        this.columns = [
            {
                title: '序号',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
                render: (text, record, index)=><span>{index + 1}</span>
            },
            { // 操作：增加 / 删除 Item
                title: '操作',
                key: 'operation',
                render: (text, record, index) => (
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
            { // 商品名称：Select下拉框
                title: '商品名称',
                dataIndex: 'productName',
                key: 'productName',
				width: '20%',
                render: (text, record, index) => {
                    // console.log(text)   // 热水器
                    // console.log(record) // {key: '0', productId: '645a5ee0e7cb2043bcdd50a2', productName: '热水器', quantity: '1', productUnit: '家电', …}
                    // console.log(index)  // 0\
                    // console.log(productList) // (2) [{…}, {…}]
                    // FIXME: 双击显示下拉 失去焦点显示label
                    return <ListEditableCell
                        disabled={disabled}
                        editType='editCell'
                        componentType='combo'
                        productList={productList}
                        value={{key: record['productId'], label: text}}
                        onChange={this.onListCellChange(index, 'productName')}
                    />
                }
            },
            { // 数量：数字类型输入框
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
            { // 单位：无
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
            { // 单价：数字类型输入框
                title: '单价',
                dataIndex: 'price',
                key: 'price',
				width: '10%',
                render: (text, record, index)=>(
                    <EditableCell
						fieldType="number"      // 输入框类型：数字
                        disabled={disabled}
                        editType='editCell'
                        value={text}
                        onChange={this.onLinkCellChange(index, 'price')}
                    />
                )
            },
            { // 金额/元：无
                title: '金额 / 元',
                dataIndex: 'amount',
                key: 'amount'
            },
            { // 备注： 文本类型输入框
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
				width: '20%',
                render: (text, record, index) => (
                    // 是否可编辑：{editable ? () : ()}
                    <EditableCell
						fieldType="text"        // 输入框类型：文本
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
    onCellChange(index, key) { // key: remarks
        const {editProducts} = this.props;
        const {totalAmount, paymentAmount} = this.state;
        // console.log(totalAmount)     // 合计金额: 9000
        // console.log(paymentAmount)   // 支付金额: 0
        // console.log(this.state.dataSource) // Item中的值：[{key:"0", remarks: "沙发上ss", amount: 9000}]
        return (value) => {
            // console.log(value) // 文本域的值：沙发上谁谁谁saasf
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value; // FIXME: 将数组中文本域的值 重新赋值
            this.setState({dataSource});
            editProducts(dataSource, totalAmount, paymentAmount); // 将数据重新Change
        }
    }

    // Table 选择商品名称 / 下拉选择值
    onListCellChange(index, key){ // Item项的索引
		const {editProducts} = this.props;
		const {totalAmount, paymentAmount} = this.state;
		return ({key, label}) => {
            // console.log(key, label) //  Select传递过来的值：  key: 642f7b9c0f672825c06161c8     label: 三星手机 (三星)
			const dataSource = [...this.state.dataSource];
			const arr = label.match(/([\u4e00-\u9fa5\w]+)/g);
            if(key !== '' && arr !== null){
                dataSource[index]['productId'] = key;       // Id
                dataSource[index]['productName'] = arr[0];  // 三星手机
                dataSource[index]['productUnit'] = arr[1];  // 三星
                this.setState({dataSource: [...dataSource]});  // 根据Item的索引去设置Key属性
                editProducts(dataSource, totalAmount, paymentAmount);
            }
		}
	}

    // Table单元格：  数量 / 单价
    onLinkCellChange(index, key) { // Key:  quantity / price
        const {editProducts, productList} = this.props;
        const {paymentAmount} = this.state;
        return (value) => {
            let dataSource = [...this.state.dataSource];
            let record = dataSource[index]; // 表示第几个Item
            // console.log(record)  // // {amount: -1200, price: "400", quantity: "-3"}
            if (key === 'quantity') {
                let price = record.price;
				let selectProduct = productList.filter(product => product._id === record.productId)[0];
				/*如果输入的产品数量大于库存量，则给出提示*/
                if(value > selectProduct.amount){
					message.error(`商品数量不能大于当前库存量: ${selectProduct.amount}！`);
					value = 0;
				}
                if (price !== null) {
                    record.amount = (value * price).toFixed(2) * 1;          // 每项金额 = 数量 * 价格
                }
            } else if (key === 'price') {
                let quantity = record.quantity; // 数量
                if (quantity !== null) {
                    record.amount = (value * quantity).toFixed(2) * 1;       // 每项金额 = 单价 * 数量
                }
            }
            record[key] = value;
            // console.log("重新设置的值为：", record) // {amount: -1200, price: "400", quantity: "-3"}
            this.setState({dataSource});
            let totalAmount = this.getTotalAmount();
            this.setState({totalAmount});
            editProducts(dataSource, totalAmount, paymentAmount);
        }
    }

    // 合计金额: 每一项Item的金额累加的结果
    getTotalAmount() {
        const dataSource = [...this.state.dataSource];
        let totalAmount = 0;
        dataSource.map(Item => totalAmount += Item['amount']);  // 累加金额 = 合计金额
        return totalAmount;
    }

    // Table 删除Item项目
    onDelete(index) {
        const {editProducts} = this.props;
        const {totalAmount, paymentAmount} = this.state;
        return () => {
            const dataSource = [...this.state.dataSource];
            if(dataSource.length > 1){
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
            key: count,         // 索引
            productId: '',      // 产品Id
            productName: '',    // 产品名称
            quantity: 0,        // 数量
            productUnit: '',    // 产品单元
            price: 0,           // 价格
            amount: 0,          // Item总金额
            remarks: ''         // Item备注
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

    FooterData = ()  => {
        let {dataSource, totalAmount, paymentAmount} = this.state;
        let {disabled} = this.props;
        return (
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
        )
    }


    render() {
        let {dataSource, totalAmount, paymentAmount} = this.state;
        let {disabled} = this.props;
        return (
            <div className={addOrderGrid}>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={false}
                    footer={() => this.FooterData()}
                    size="small"
                    rowClassName={() => rowClassName}
                />
            </div>
        );
    }
}
AddOrderGrid.propTypes = {
    onPageChange: PropTypes.func,
    onModify: PropTypes.func,
    onDel: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any
};
export default AddOrderGrid;
