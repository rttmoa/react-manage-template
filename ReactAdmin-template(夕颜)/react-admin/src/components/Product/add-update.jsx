import React, {Component} from 'react';
import {Card, Button, Form, Input, Cascader, message} from 'antd'
import {ArrowLeftOutlined} from "@ant-design/icons";
import qs from 'querystring'
import {list, add, update} from '../../api/category'
import PicturesWall from "./pictures-wall";
import PubSub from 'pubsub-js'
import RichTextEditor from "./rich-text-editor";





class ProductUpdate extends Component {

    state = {
        options: [],
        imgs: [],
        content: ""
    };

    constructor() {
        super();
        this.init();
    }

    // 初始化一级列表
    init = () => {
        list(0).then(res => {
            if (res.status === 0) {
                //遍历数据并重新返回一个新的数组
                const options = res.data.map(category => {
                    return {
                        value: category._id,
                        label: category.name,
                        isLeaf: false,
                    }
                })
                //写入状态种
                this.setState({options})
            }
        })
    }

    componentDidMount() {
        //订阅收集上传图片的数据
        PubSub.subscribe('upload', (_, imgs) => {
            this.setState({imgs})
        });
        //订阅富文本的内容
        PubSub.subscribe('rich-text', (_, content) => {
            this.setState({content})
        });
    }

    //提交表单的回调
    onFinish = (data) => {
        const {imgs, content} = this.state;
        //设置图片数组
        const imgList = [];
        imgs.map(img => {
            return imgList.push(img.url)
        })
        data.imgs = imgList
        data.detail = content
        data.categoryId = data.categoryId[1]
        data.pCategoryId = data.categoryId[0]
        const {search} = this.props.location
        const {title} = qs.parse(search.slice(1))
        if (title === "添加") {
            add(data).then(res => {
                console.log(res)
                if (res.status === 0) {
                    message.success("添加成功")
                    this.props.history.replace("/product")
                }
            })
        } else {
            update(data).then(res => {
                if (res.status === 0) {
                    message.success("修改成功")
                    this.props.history.replace("/product")
                }
            })
        }
    }
    //异步加载二级数据 - 商品分类
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            list(targetOption.value).then(res => {
                //遍历数据并重新返回一个新的数组
                const options = res.data.map(category => {
                        return {
                            value: category._id,
                            label: category.name,
                            isLeaf: true,
                        }
                    }
                )
                //新的数组赋值给二级列表
                targetOption.children = options;
                //重新写入状态
                this.setState({
                    options: [...this.state.options],
                });
            })
        }, 1000);
    }






    render() {
        const {search} = this.props.location; // {hash:"", key:"pb43it", pathname:"/product/addUpdate", search: "?title=修改"} 
        const {title} = qs.parse(search.slice(1)) // title="修改" - 变成对象格式 - {title: '修改'} 
        let {category} = this.props.location.state || {}; // 路由传递的 通过state接收
        
        // 处理添加的时候出现category是undefined
        if (category === undefined) {
            category = {}
        }
        // console.log(!!category)
        const categoryId = [];
        categoryId.push(category.pCategoryId)
        categoryId.push(category.categoryId)
        // console.log(categoryId) // ['5e12b8bce31bb727e4b0e348', '5fc74b650dd9b10798413162']
        const titleMenu = (
            <span>
                <Button onClick={() => this.props.history.replace("/product")} type="link">
                    <ArrowLeftOutlined/>
                </Button>
                {title}商品
            </span>
        )
        return (
            <Card title={titleMenu}>
                <Form
                    name="basic"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 8}}
                    initialValues={{
                        _id: category._id,
                        name: category.name,
                        desc: category.desc,
                        price: category.price,
                        categoryId: categoryId,
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item hidden name="_id" >
                        <Input />
                    </Form.Item>

                    <Form.Item label="商品名称" name="name" rules={[{required: true, message: '商品名称不能为空!'}]} >
                        <Input placeholder={"请输入商品名称"}/>
                    </Form.Item>

                    <Form.Item label="商品描述" name="desc" rules={[{required: true, message: '商品描述不能为空!'}]} >
                        <Input.TextArea autoSize={{minRows: 2, maxRows: 6}}/>
                    </Form.Item>
                    <Form.Item label="商品价格" name="price" rules={[{required: true, message: '商品价格不能为空!'}, {
                                validator: (_, value, callback) => {
                                    if (value <= 0) {
                                        return Promise.reject(new Error('金额不能低于0元'));
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input type="number" addonAfter="元"/>
                    </Form.Item>
                    <Form.Item label="商品分类" name="categoryId" rules={[{required: true, message: '商品分类不能为空!'}]} >
                        <Cascader options={this.state.options} loadData={this.loadData}/>
                    </Form.Item>
                    <Form.Item label="商品图片" name="imgs" >
                        {/* 图片上传、预览、删除功能 */}
                        <PicturesWall imgs={category.imgs}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 20}} label="商品详情" name="detail" >
                        {/* 富文本编辑器组件 */}
                        <RichTextEditor detail={category.detail}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 2, span: 8}}>
                        <Button type="primary" htmlType="submit">{title}</Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default ProductUpdate;