import React, {Component} from 'react';
import {message, Button, Card, Space, Table, Select, Input} from 'antd'
import {SaveOutlined} from "@ant-design/icons";
import {list, search, updateStatus} from '../../api/product'

const {Column} = Table;

class ProductHome extends Component {
    state = {
        loading: false,
        productList: [],
        pageNum: 1,
        pageSize: 5,
        total: 0,
        productType: "productName",
        productValue: "",
    }

    componentDidMount() {
        this.init();
    }

    //初始化
    init = () => {
        this.setState({loading: true})
        setTimeout(() => {
            const {pageNum, pageSize} = this.state;
            list(pageNum, pageSize).then(res => {
                this.setState({productList: res.data.list, total: res.data.total})
                this.setState({loading: false})
            })
        }, 500)
    }

    //搜索
    search = () => {
        setTimeout(() => {
            this.setState({loading: true, productValue: this.productValueNode.state.value}, () => {
                const {pageSize, pageNum, productType, productValue} = this.state
                search(pageNum, pageSize, productType, productValue).then(res => {
                    this.setState({productList: res.data.list, total: res.data.total})
                    this.setState({loading: false})
                })
            })
        }, 500)
    }
    //上下架
    handUpdateStatus = (product) => {
        let {status, _id} = product
        return () => {
            //判断如果是上架那么修改的状态就需要改成下架
            if (status === 1) {
                status = 2;
            } else if (status === 2) {
                status = 1;
            }
            updateStatus({"productId": _id, "status": status}).then(res => {
                if (res.status === 0) {
                    message.success("操作成功")
                    this.init();
                }
            })
        }
    }

    render() {
        const {loading, productList, total, productValue, pageSize, productType} = this.state
        const title = (
            <span>
                 <Select defaultValue={productType} style={{width: 150}}
                         onChange={value => this.setState({productType: value})}>
                    <Select.Option value="productName">按名称搜索</Select.Option>
                    <Select.Option value="productDesc">按描述搜索</Select.Option>
                 </Select>
                 <Input ref={c => this.productValueNode = c} placeholder={"输入关键字"}
                        style={{width: 150, margin: '0 15px'}}></Input>
                <Button onClick={this.search} type="primary">搜索</Button>
            </span>
        )
        return (
            <div>
                <Card title={title}
                      extra={<Button icon={<SaveOutlined/>}
                                     onClick={() => this.props.history.push("/product/addUpdate?title=添加")}
                                     type="primary">添加商品</Button>}
                      style={{width: '100%', height: '100%'}}>
                    <Table bordered pagination={{
                        defaultPageSize: pageSize,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 15, 20],
                        total,
                        /*
                        * 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
                         */
                        onChange: (pageNum, pageSize) => {
                            this.setState({pageNum}, () => {
                                if (productValue !== "") {
                                    this.search()
                                } else {
                                    this.init();
                                }
                            })
                        }
                    }} loading={loading} dataSource={productList} rowKey="_id">
                        <Column align={"center"} title="商品名称" dataIndex="name" key="name"/>
                        <Column align={"center"} title="商品描述" dataIndex="desc" key="desc"/>
                        <Column align={"center"} title="价格" dataIndex="price" key="price"
                                render={(price) => '￥' + price}/>
                        <Column align={"center"} width={100} title="状态" dataIndex="status" key="status"
                                render={(status, product) => {
                                    return (
                                        <span>
                                    <Button type="primary"
                                            onClick={this.handUpdateStatus(product)}>{status === 1 ? '下架' : '上架'}</Button>
                                    <span>{status === 1 ? '在售' : '已下架'}</span>
                                </span>
                                    )
                                }}/>
                        <Column
                            align={"center"}
                            width="100px"
                            title="操作"
                            key="action"
                            render={(category, record) => (
                                <Space size="middle">
                                    <Button type="link"
                                            onClick={() => this.props.history.replace("/product/detail", {category})}>详情</Button>
                                    <Button type="link"
                                            onClick={() => this.props.history.push("/product/addUpdate?title=修改", {category})}>修改</Button>
                                </Space>
                            )}
                        />
                    </Table>
                </Card>
            </div>
        );
    }
}

export default ProductHome;