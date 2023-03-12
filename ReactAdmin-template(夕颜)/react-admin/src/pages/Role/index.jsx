import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'antd'
import {list} from '../../api/role'
import AddFrom from "../../components/Role/add-from";
import AuthFrom from "../../components/Role/auth-from";

const { Column } = Table;




class Role extends Component {
    state = {
        loading: false,
        roleList: [],
        // 选中一行的数据
        rowRole: {},
        addIsModalVisible: false,
        authIsModalVisible: false
    }

    init = () => { /***--- 获取所有角色 ---**/
        list().then(res => {
            this.setState({roleList: res.data})
        })
    }

    // 选中当前行的事件
    selectRow = (rowRole) => {
        // console.log('sel', rowRole) // 所有数据
        return {
            onClick: event => {
                console.log(rowRole) // 选中的每一条数据
                this.setState({ rowRole })
            }
        }
    }

    componentDidMount() {
        this.init();
    }

    //取消事件
    handleCancel = () => {
        // console.log('触发 handleCancel 关闭')
        this.setState({addIsModalVisible: false, authIsModalVisible: false})
    }

    render() {
        const {loading, roleList, rowRole, addIsModalVisible, authIsModalVisible} = this.state;
        // console.log(!rowRole._id)

        const title = (
            <span>
                <Button type="primary" onClick={() => this.setState({addIsModalVisible: true})}>创建角色</Button>
                <Button disabled={!rowRole._id} onClick={() => this.setState({authIsModalVisible: true})}>设置角色权限</Button>
            </span>
        )
        return (
            <div>
                <Card title={title} style={{width: '100%', height: '100%'}}>
                    <Table onRow={this.selectRow}
                           rowSelection={{
                                type: 'radio',
                                onSelect: (rowRole)=>{
                                    // console.log(rowRole)
                                    return this.setState({rowRole})
                                },
                                selectedRowKeys: [rowRole._id]
                            }}
                           bordered
                           pagination={{
                               defaultPageSize: 3,
                               // pageSize: 3,
                               showQuickJumper: true,
                               showSizeChanger: true,
                               pageSizeOptions: [5, 10, 15, 20],
                           }} loading={loading} dataSource={roleList} rowKey="_id"
                        >
                            <Column align={"center"} title="角色名称" dataIndex="name" key="name"/>
                            <Column align={"center"} title="创建时间" dataIndex="create_time" key="create_time"/>
                            <Column align={"center"} title="授权时间" dataIndex="auth_time" key="auth_time"/>
                            <Column align={"center"} title="授权人" dataIndex="auth_name" key="auth_name"/>
                    </Table>
                </Card>

                <Modal footer={null} destroyOnClose title="添加角色" visible={addIsModalVisible}
                       onCancel={this.handleCancel}
                >
                    {/* 添加用户组件 */}
                    <AddFrom init={this.init} handleCancel={this.handleCancel}/>
                </Modal>
                
                <Modal footer={null} destroyOnClose title="授权角色权限" visible={authIsModalVisible}
                       onCancel={this.handleCancel}
                >
                    {/* 角色授权组件 */}
                    <AuthFrom init={this.init} rowRole={rowRole} handleCancel={this.handleCancel}/>
                </Modal>
            </div>
        );
    }
}

export default Role;