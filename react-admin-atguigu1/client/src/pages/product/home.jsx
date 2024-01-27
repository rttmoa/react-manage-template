import React, { Component } from 'react';
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';

import LinkButton from '../../components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option;

/*
Product的默认子路由组件
 */
export default class ProductHome extends Component {
    state = {
        total: 0, // 商品的总数量
        products: [], // 商品的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 类型：根据商品名称 or 商品描述搜索
        page_size: PAGE_SIZE,
    };

    /*
      获取指定页码的列表数据显示
   */
    getProducts = async (pageNum, pageSize) => {
        // console.log('页码回调', pageNum, pageSize);
        this.pageNum = pageNum; // 保存pageNum, 让其它方法可以看到
        this.setState({ loading: true }); // 显示loading

        const { searchName, searchType } = this.state;
        let result;
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: this.state.page_size, searchName, searchType });
        } else {
            result = await reqProducts(pageNum, this.state.page_size);
        }
        // console.log(result);
        this.setState({ loading: false }); // 隐藏loading
        if (result.status === 0) {
            // 取出分页数据, 更新状态, 显示分页列表
            const { total, list } = result.data;
            this.setState({
                total,
                products: list,
            });
        }
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getProducts(1);
    }

    render() {
        // console.log(this)
        // const {columns, context, pageNum, refs } = this;
        // 取出状态数据
        const { products, total, loading, searchType, searchName } = this.state;

        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={event => this.setState({ searchName: event.target.value })} />
                <Button type="primary" onClick={() => this.getProducts(1)}>
                    搜索
                </Button>
            </span>
        );

        const extra = (
            <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
                <Icon type="plus" />
                添加商品
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        current: this.pageNum, // 当前页数
                        total, // 数据总数
                        defaultPageSize: this.state.page_size, // 默认的每页条数
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '5', '10', '15'],
                        showQuickJumper: true,
                        onChange: this.getProducts, // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange: (current, size) => {
                            // console.log('pageSize 变化的回调', current, size);

                            this.setState({ page_size: size }, () => {
                                this.getProducts(1);
                            });
                        },
                    }}
                />
            </Card>
        );
    }

    /*
      初始化table的列的数组
   */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: price => '¥' + price, // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 130,
                title: '状态',
                // dataIndex: 'status',
                render: product => {
                    const { status, _id } = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                            <Button size="small" type="primary" onClick={() => this.updateStatus(_id, newStatus)}>
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            &nbsp;&nbsp;
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    );
                },
            },
            {
                width: 150,
                title: '操作',
                render: product => {
                    return (
                        <span>
                            {/*将product对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
                            &nbsp;&nbsp;&nbsp;
                            <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
                        </span>
                    );
                },
            },
        ];
    };
    // table: 更新状态： 上架、下架
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status);
        if (result.status === 0) {
            message.success('更新商品成功');
            this.getProducts(this.pageNum);
        }
    };
    // table: 商品详情  /product/detail
    showDetail = procut => {
        // 缓存product对象 ==> 给detail组件使用
        memoryUtils.product = procut;
        this.props.history.push('/product/detail');
    };
    // table: 商品修改  /product/addupdate
    showUpdate = procut => {
        // 缓存product对象 ==> 给detail组件使用
        memoryUtils.product = procut;
        this.props.history.push('/product/addupdate');
    };
}
