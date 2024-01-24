import React from 'react';
import { Card, Button, Table, Form, Input, Checkbox, Tag, Select, Badge, Radio, Icon, message, Popconfirm, Modal, DatePicker } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable/index';
import Moment from 'moment';
import ax from 'axios';
import BaseForm from '../../components/BaseForm';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;



export default class User extends React.Component {
    state = {
        list: [],
        pagination: {},
    };

    params = {
        page: 1,
    };

    // ! 获取接口列表数据及分页数据
    requestList = () => {
        // axios
        //     .ajax({
        //         url: '/table/list1',
        //         data: {
        //             params: {
        //                 page: this.params.page,
        //             },
        //         },
        //     })
        //     .then(res => {
        //         let _this = this;
        //         this.setState({
        //             list: res.result.list.map((item, index) => {
        //                 item.key = index;
        //                 return item;
        //             }),
        //             pagination: Utils.pagination(res, current => {
        //                 _this.params.page = current;
        //                 _this.requestList();
        //             }),
        //             // pagination: Utils.pagination(res, (current) => { this.params.page = current; this.requestList(); })
        //         });
        //     });

        ax.get(
            'https://mock.mengxuegu.com/mock/6517714296175e3c6ac1c6b7/table/lists',
            {
                method: 'get', 
                headers: null, 
                params: this.state.params,
                timeout: 5000,
                data: {
                    params: this.state.params
                }
            }
            // axios ts 配置 AxiosRequestConfig
        ).then(res => {
            // console.log(res);
            let _this = this;
            this.setState({
                list: res.data.result.list.map((item, index) => {
                    return {
                        ...item,
                        key: index,
                    };
                }),
                pagination: Utils.pagination(res.data, current => {
                    _this.params.page = current;
                    _this.requestList();
                }),
                // pagination: Utils.pagination(res, (current) => { this.params.page = current; this.requestList(); })
            });
        });
    };

    componentDidMount() {
        this.requestList();
    }

    // ! 操作员工： 新建、编辑、详情、删除  弹窗显示
    handleOperator = (type = '', item = {}) => {
        // let item = this.state.selectedItem;
        if (type === 'create') {
            this.setState({
                title: '创建员工',
                isVisible: true,
                type,
            });
        } else if (type === 'edit' || type === 'detail') {
            // if (!item) {
            //     Modal.info({
            //         title: '信息',
            //         content: '请选择一个用户',
            //     });
            //     return;
            // }
            this.setState({
                title: type === 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type,
            });
        } else if (type === 'delete') {
            // if (!item) {
            //     Modal.info({
            //         title: '信息',
            //         content: '请选择一个用户',
            //     });
            //     return;
            // }
            message.success(`删除用户成功！ id:${item.id}`);

            // Popconfirm.confirm({
            //     text: '确定要删除此用户吗？',
            //     onOk: () => {
            //         axios
            //             .ajax({
            //                 url: '/user/delete',
            //                 data: {
            //                     params: {
            //                         id: item.id,
            //                     },
            //                 },
            //             })
            //             .then(res => {
            //                 if (res.code == 0) {
            //                     this.setState({
            //                         isVisible: false,
            //                     });
            //                     this.requestList();
            //                 }
            //             });
            //     },
            // });
        }else if(type === "moreDelete"){
            message.success(`删除更多用户成功！ id:${JSON.stringify(this.state.selectedIds)}`);
        }
    };

    // ! 操作员工： 新建、编辑、详情、删除  弹窗内容提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios
            .ajax({
                url: type === 'create' ? '/user/add' : '/user/edit',
                data: {
                    params: {
                        ...data,
                    },
                },
            })
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        isVisible: false,
                    });
                    this.requestList();
                }
            });
    };


    handleFilter = (filterParams = {}) => {
        // console.log('filterParams', filterParams) // {user_name: 'Lin7duy', sex: 0, begin_time: undefined, end_time: undefined, isMarried: '1'}
        this.params = filterParams;
        this.requestList(); // 重新获取数据，根据 过滤参数去查询
    }

    render() {

        const formList = [ 
            {
                type:'INPUT',
                label:'用户名',
                field:'user_name',
                placeholder:'请输入用户名',
                initialValue:'',
                width:80,
            },
            {
                type:'SELECT',
                label:'性别',
                field:'sex',
                placeholder:'全部',
                initialValue: 3,
                width:80,
                list: [{ id: 3, name: '全部' }, { id: 0, name: '女' }, { id: 1, name: '男' }]
            },
            {
                label: '出生日期',
                type: '时间查询'
            }, 
            {
                type: 'SELECT',
                label: '婚姻状态',
                field:'isMarried',
                placeholder: '全部',
                initialValue: '0',
                width: 80,
                list: [{ id: '0', name: '全部' }, { id: '1', name: '未婚' }, { id: '2', name: '已婚' }]
            }
        ]

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                // fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                // fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女';
                },
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: <Tag color="green">大学生</Tag>,
                        2: <Tag color="blue">求职中...</Tag>,
                        3: <Tag color="orange">职员</Tag>,
                        4: <Tag color="red">项目经理</Tag>,
                        5: <Tag color="purple">总经理</Tag>,
                    };
                    return config[state];
                },
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        1: '游泳',
                        2: '打篮球',
                        3: '踢足球',
                        4: '跑步',
                        5: '爬山',
                        6: '骑行',
                        7: '桌球',
                        8: '麦霸',
                    };
                    return config[interest];
                },
            },
            {
                title: '婚姻状态',
                dataIndex: 'isMarried',
                render(isMarried) { 
                    // return isMarried ? '已婚' : '未婚';
                    // success | error | default | processing | warning
                    return isMarried ? <Badge status="success" text="已婚" /> : <Badge status="error" text="未婚" />;
                },
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: "手机号",
                render: () => {
                    return <span>{Utils.formatPhone("15303663375")}</span>
                }
            }, 
            {
                title: "身份证号",
                render: () => {
                    return <span>{Utils.formatIdentity("231085199811011415")}</span>
                }
            }, 
            {
                title: '联系地址',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
            },
            {
                title: '操作',
                fixed: 'right',
                render: record => {
                    return (
                        <div> 
                            <Button icon="edit" size="small" onClick={() => this.handleOperator('edit', record)}>
                                编辑
                            </Button>
                            <Button icon="rocket" size="small" onClick={() => this.handleOperator('detail', record)}>
                                详情
                            </Button>
                            <Button type="danger" icon="delete" size="small" onClick={() => this.handleOperator('delete', record)}>
                                删除
                            </Button>
                        </div>
                    );
                },
            },
        ];
        // console.log(this.state.list);
        // console.log(this.state.pagination);
        // console.log(this.state.selectedRowKeys)
        // console.log(this.state.selectedIds)
        return (
            <div> 
                <Card> 
                    <BaseForm formList={formList} filterSubmit={this.handleFilter}/>
                </Card>

                <Card style={{ marginTop: 10, display:'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" icon="plus" size="middle" onClick={() => this.handleOperator('create')}>新建</Button> 
                    <Button type="danger" icon="delete" size="middle" onClick={() => this.handleOperator('moreDelete')}>多选删除</Button>
                </Card>

                <div className="content-wrap">
                    <ETable 
                        rowSelection="checkbox"
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        // scroll
                    />
                </div>

                {/* TODO: 新建、编辑、详情 弹窗 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: '',
                        });
                    }}>
                    <UserFormModal userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={inst => (this.userForm = inst)} />
                </Modal>
            </div>
        );
    }
}
class UserFormModal extends React.Component {
    getState = state => {
        return {
            1: '大学生',
            2: '求职中...',
            3: '职员',
            4: '项目经理',
            5: '总经理',
        }[state];
    };
    // this.getState('2')

    render() {
        console.log('新建 / 编辑');
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {userInfo && type === 'detail'
                        ? userInfo.username
                        : getFieldDecorator('user_name', {
                              initialValue: userInfo.username,
                          })(<Input type="text" placeholder="请输入姓名" />)}
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {userInfo && type === 'detail'
                        ? userInfo.sex === 1
                            ? '男'
                            : '女'
                        : getFieldDecorator('sex', {
                              initialValue: userInfo.sex,
                          })(
                              <RadioGroup>
                                  <Radio value={1}>男</Radio>
                                  <Radio value={2}>女</Radio>
                              </RadioGroup>
                          )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {userInfo && type === 'detail'
                        ? this.getState(userInfo.state)
                        : getFieldDecorator('state', {
                              initialValue: userInfo.state,
                          })(
                              <Select>
                                  <Option value={1}>大学生</Option>
                                  <Option value={2}>求职中...</Option>
                                  <Option value={3}>职员</Option>
                                  <Option value={4}>项目经理</Option>
                                  <Option value={5}>总经理</Option>
                              </Select>
                          )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {userInfo && type === 'detail'
                        ? userInfo.birthday
                        : getFieldDecorator('birthday', {
                              initialValue: Moment(userInfo.birthday),
                          })(<DatePicker />)}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {userInfo && type === 'detail'
                        ? userInfo.address
                        : getFieldDecorator('address', {
                              initialValue: userInfo.address,
                          })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
                </FormItem>
            </Form>
        );
    }
}
UserFormModal = Form.create({})(UserFormModal);
