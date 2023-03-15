import React, {Component} from 'react';
import {Button, Card, List} from 'antd'
import {ArrowLeftOutlined} from "@ant-design/icons";
import {info} from '../../api/category'
import './index.less'




class ProductDetail extends Component {
    state = {
        categoryName: "",
        pCategoryName: ""
    }

    //render之前执行的构造方法
    constructor(props) {
        super(props);
        const {categoryId, pCategoryId} = this.props.location.state.category;
        //后台查询分类名称   由于如果上级是一级就不需要查找了
        if (pCategoryId === "0") {
            info(categoryId).then(res => {
                this.setState({categoryName: res.data.name})
            })
        } else {
            info(categoryId).then(res => {
                this.setState({categoryName: res.data.name})
            })
            info(pCategoryId).then(res => {
                this.setState({pCategoryName: res.data.name})
            })
        }
    }

    render() {
        const {category} = this.props.location.state;
        const {categoryName, pCategoryName} = this.state;
        const title = (
            <span>
                <Button onClick={() => this.props.history.replace("/product")} type="link">
                    <ArrowLeftOutlined/>
                </Button>
                商品详情
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List
                    bordered>
                    <List.Item>
                        <span className="left">商品名称:</span>
                        <span>{category.name}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品描述:</span>
                        <span>{category.desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品价格:</span>
                        <span>{category.price}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">所属分类:</span>
                        <span>{categoryName} {pCategoryName ? '--> ' + pCategoryName : ''}</span>
                    </List.Item>
                    <List.Item>
                        <span className="left">商品图片:</span>
                        {
                            category.imgs.map(img => {
                                return (
                                    <span key={img}><img alt={img}
                                                         style={{
                                                             width: 150,
                                                             height: 150,
                                                             marginRight: 10,
                                                             border: '1px solid #002140'
                                                         }}
                                                         src={`http://localhost:5000/upload/${img}`}/></span>
                                )
                            })
                        }
                    </List.Item>
                    <List.Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: category.detail}}></span>
                    </List.Item>
                </List>
            </Card>
        )
            ;
    }
}

export default ProductDetail;