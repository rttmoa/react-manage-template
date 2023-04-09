import React, { Component } from "react";
import { Spin, notification, Button, Popconfirm, Form, Input, message, Layout } from "antd";
import TableList from "@tableList";
import { synUser } from "@apis/common";
import { fetchUserDepttList, fetchUserList, fetchUserDetail, fetchUserDelete, fetchRoleList, fetchChangeUserStatus } from "@apis/manage";
import TreeList from "./treeList";
import AddPolice from "./modal/addPolice";
import SelectRole from "./modal/selectRole";
const FormItem = Form.Item;
const { Content, Sider } = Layout;
const { fetchBtns } = require("@configs/common");








@Form.create({})
// 声明组件  并对外输出
export default class app extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      // activeTab: 'list',
      searchtitle: "",
      PoliceAddVisible: false,
      synchronizeLoading: false,
      RoleVisible: false,
      spinloading: true,
      moduletitle: "",
      moduletype: "",
      currPeopleId: "",
      // hasList: false,
      searchKey: {
        keyword: "",
        pageSize: 10,
        pageNo: 1,
        deptCode: "", // 部门Id - Tree结构的部门Id
      },
      btnRights: {
        view: true,
        freeze: true,
        delete: true,
        edit: true,
        add: true,
      }, // 按钮权限的数组
      userDeptResult: { list: [], loading: false },
      userListResult: { list: [], loading: false },
      userDetailResult: { list: [], loading: false },
      userRoleSetResult: { list: [], loading: false },
    };
  }
  // 组件即将加载
  componentWillMount() {
    this.getBtnRights()
    fetchRoleList({}, (res) => {
      this.setState({ userRoleSetResult: res.data });
    });
    fetchUserDepttList({}, (res) => {
      if (res.data.list.length > 0) {
        this.setState({
            userDeptResult: res.data,
            spinloading: false,
            searchKey: {
              ...this.state.searchKey,
              deptCode: res.data.list[0].deptCode,
            },
          }, () => {
            this.getData(() => {
              this.setState({
                searchtitle: "杭州市",
                // hasList: true,
              });
            });
          }
        );
      } else {
        this.setState({ spinloading: false });
      }
    });
  }
  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue({ key: "" });
  }

  // #region 收缩业务代码功能

  // 发送获取当前菜单的按钮权限
  getBtnRights() {
    // fetchBtns(this, btnRights => this.setState({ btnRights })); // bug
  }

  /***--- 获取用户列表数据 ++++++++++++++++++++++++++++++++ ---**/
  getData(callback) {
    fetchUserList({ ...this.state.searchKey }, (res) => {
      this.setState({
        userListResult: res.data,
      });
      callback && callback();
    });
  }

  /***--- Table -> 操作 -> 删除用户 ---**/
  handleDelete(id) {
    if (sessionStorage.getItem("userid") === id) {
      message.warning("自己不能删除自己");
      return;
    }
    const curUserListResult = this.state.userListResult;
    let curpage = this.state.searchKey.pageNo;
    fetchUserDelete({ deptcode: this.state.searchKey.deptCode, id: id }, res => {
        message.success(res.msg);
        if (curUserListResult.totalPage > 1 && curUserListResult.totalCount % 10 === 1) {
          curpage -= 1;
        }
        this.setState({
            searchKey: {
              ...this.state.searchKey,
              pageNo: curpage
            }
          }, () => {
            this.getData();
          }
        );
      }
    );
  }
 
  /***--- Table -> 操作 -> 冻结、解冻用户(获取数据成功后 重新获取数据) ---**/
  handleChangeStatus(id, status) {
    fetchChangeUserStatus({ id: id, status: status }, (res) => {
      message.success(res.msg);
      this.getData();
    });
  }

  /***--- Table -> 操作 -> 点击人员详情(获取数据成功后 设置state的值) ---**/
  handleUserInfo = (id) => {
    fetchUserDetail({ id: id }, (res) => {
      // console.log("获取详情数据成功", res)
      message.info("获取详情数据成功", 1)
      this.setState({
        userDetailResult: res.data,
        PoliceAddVisible: true,
        moduletype: "edit",
        moduletitle: "详情",
        currPeopleId: id,
      });
    });
  };

  // 点击人员角色
  handleUserRole(id) {
    fetchUserDetail({ id: id }, res => {
      this.setState({
        userDetailResult: res.data,
        RoleVisible: true,
        currPeopleId: id
      });
    });
  }

  /***--- 搜索 先设置state，通过getData初始条件+state去搜索数据    ++++++++++++++++++++++ ---**/
  handleSearch = (e) => {
    e.preventDefault();
    const keyword = this.props.form.getFieldValue("key");
    this.setState({
        spinloading: true,
        searchKey: {
          ...this.state.searchKey,
          keyword: keyword,
          pageNo: 1,
        },
      }, () => {
        this.getData(() => {
          this.setState({ spinloading: false });
        });
      }
    );
  };

  /***--- 点击树节点的时候获取 当前部门 deptid ---**/
  onSelect = (info, title) => {
    if (info && info.length > 0) {
      message.success(`切换${title}成功`, 1)
      this.setState({
          spinloading: true,
          searchtitle: title,
          searchKey: {
            ...this.state.searchKey,
            deptCode: info[0],
            pageNo: 1,
            keyword: "",
          },
        }, () => {
          this.getData(() => {
            this.setState({
              spinloading: false,
              // hasList: true,
            });
          });
        }
      );
      this.props.form.setFieldsValue({ key: "" });
    }
  };

  /***--- 点击新增人员的时候判断部门 deptid  是否存在，有则 通知 弹窗新增 ---**/
  policeAdd() {
    // console.log("deptId", this.state.searchKey.deptCode)
    if (this.state.searchKey.deptCode) {
      notification.info({message: `deptId是${this.state.searchKey.deptCode}`})
      this.setState({
        PoliceAddVisible: true,
        moduletype: "add",
        moduletitle: "新增",
      });
    } else {
      notification.error({
        message: "错误",
        description: "请先选择部门",
      });
    }
  }

  /***--- 同步人员信息 ---**/
  synchronize() {
    message.info("用户数据同步中");
    this.setState( {synchronizeLoading: true}, () => {
        synUser({}, (results) => {
            message.success("用户数据同步完成");
            this.setState({
              synchronizeLoading: false,
            });
            this.getData();
          }, (error) => {
            message.warning(error.msg);
            this.setState({
              synchronizeLoading: false,
            });
          }
        );
      }
    );
  }

  /***--- Model -> 新增或编辑用户保存 ---**/
  handleOk = () => {
    const curUserListResult = this.state.userListResult;
    let curpage = this.state.searchKey.pageNo;
    // 当添加用户，要添加的第11或21等，要翻页时
    if (this.state.moduletype === "add" && curUserListResult && curUserListResult.totalCount > 0 && curUserListResult.totalCount % 10 === 0) {
      curpage += 1;
    }
    this.setState({
        PoliceAddVisible: false,
        searchKey: {
          ...this.state.searchKey,
          pageNo: curpage,
        },
      }, () => {
        this.getData();    // 设置好state的值， state的回调中 去根据设置好了的state去发请求 ++++++++++++
      }
    );
  };

  /***--- 新增用户modal取消 ---**/
  handleCancel = () => {this.setState({ PoliceAddVisible: false });};

  /***--- Model -- 角色弹窗确认事件 ---**/
  handleOkRole() {
    this.setState({ RoleVisible: false }, () => {
      this.getData();
    });
  }

  /***--- Model -- 角色弹窗取消事件 ---**/
  handleCancelRole() {
    message.info("取消成功")
    this.setState({ RoleVisible: false });
  }

  /***--- Table -> 页数改变事件 ---**/
  pageChange = (newPage) => {
    this.state.searchKey.pageNo = newPage;
    this.getData();
  };

  /***--- Table -> 页大小改变事件 ---**/
  pageSizeChange = (e, pageSize) => {
    this.state.searchKey.pageNo = 1;
    this.state.searchKey.pageSize = pageSize;
    this.getData();
  };

  /***--- Table -> 生成表格头部信息 +++++++++++++++  ---**/
  renderColumn() {
    return [
      {
        title: "姓名",
        dataIndex: "chineseName",
        key: "chineseName",
        width: "15%",
      },
      {
        title: "职务",
        dataIndex: "post",
        key: "post",
        width: "15%",
        render: text => <span>老板+总经理+经理+员工+前端+后端</span> 
      },
      {
        title: "帐号",
        dataIndex: "username",
        key: "username",
        width: "15%",
      },
      {
        title: "帐号状态",
        dataIndex: "statusLabel",
        key: "statusLabel",
        width: "15%",
        render: (text, record, index) => <span>{record.status ? "已冻结" : "正常"}</span>
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
        width: "20%",
        render: (text, record, index) => {
          const roleNames = [];
          (text || []).map((item) => {
            roleNames.push(item.roleName);
          });
          // return roleNames.length === 0 ? "" : roleNames.join(",");
          let roleN = roleNames.length === 0 ? "" : roleNames.join(",");
          return <button onClick={this.handleUserRole.bind(this)}>{roleN}</button>
        },
      },
      {
        title: "操作",
        key: "operate",
        render: (text, record, index) => {
          const { btnRights } = this.state;
          return (
            <span>
              {btnRights.view ? (
                <span>
                  <a onClick={() => this.handleUserInfo(record.id)}>详情</a>
                  <span className="ant-divider" />
                </span>
              ) : null}
              {btnRights.freeze ? (
                <span>
                  <Popconfirm
                    title={`确认${record.status ? "解冻" : "冻结"}账户?`}
                    placement="left"
                    onConfirm={() => this.handleChangeStatus(record.id, `${record.status}`)}
                  >
                    <a>{record.status ? "解冻账户" : "冻结账户"}</a>
                  </Popconfirm>
                </span>
              ) : null} 
              <span className="ant-divider" />
              {btnRights.delete ? (
                <Popconfirm title="删除用户?" placement="left" onConfirm={() => this.handleDelete(record.id)}>
                  <a>删除</a>
                </Popconfirm>
              ) : null} 
            </span>
          );
        },
      },
    ];
  }

  // #endregion

  render() {
    const { userDeptResult,userListResult,userDetailResult,userRoleSetResult } = this.state;
    const { btnRights } = this.state;
    const { getFieldDecorator } = this.props.form;
    const thevalue = this.state.moduletype === "add" ? "" : userDetailResult;
    // console.log("树结构数据", userDeptResult.list)



    return (
      <div className="page page-scrollfix page-usermanage">
        <Layout>
          <Layout className="page-body">

            {/* 左侧 杭州市 + 下城区 + 文一路 */}
            <Sider width={240} style={{ display: "flex", flexDirection: "column" }}>
              <Spin spinning={this.state.spinloading}>
                <h3 className="page-title">杭州市</h3>
                {/* --------封装的Tree结构----------- */}
                <div className="treeside">
                  <TreeList trees={userDeptResult.list} curDeptCode={this.state.searchKey.deptCode} onSelect={this.onSelect} />
                </div>
              </Spin>
            </Sider>

            {/* 杭州市 + 用户信息 */} 
            <Content>
              <h3 className="page-title">
                {this.state.searchtitle}
                <span className="error">{" "}{userListResult.totalCount ? userListResult.totalCount : 0}</span>人
              </h3>
              <div className="page-header">
                <div className="layout-between">
                  <Form className="flexrow" onSubmit={this.handleSearch}>
                    <FormItem>
                      {getFieldDecorator("key")(
                        <Input className="input-base-width" size="default" placeholder="请输入关键字进行搜索"/>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">搜索</Button>
                  </Form>
                </div>
              </div>
              <div className="page-content has-pagination table-flex table-scrollfix">
                <TableList
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={userListResult.list}
                  currentPage={this.state.searchKey.pageNo}
                  pageSize={this.state.searchKey.pageSize}
                  loading={userListResult.loading}
                  scroll={{ y: true }}
                  onChange={this.pageChange}
                  onShowSizeChange={this.pageSizeChange}
                  totalCount={userListResult.totalCount}
                />
              </div>
              {/* 新增人员 / 同步人员 */}
              <div className="page-footer">
                <div className="page-footer-buttons">
                  {btnRights.add ? (
                    <Button type="primary" style={{ marginRight: "10px" }} onClick={() => this.policeAdd()}>
                      {" "} 新增人员
                    </Button>
                  ) : null}
                  {btnRights.add ? (
                    <Button type="primary" loading={this.state.synchronizeLoading} onClick={() => this.synchronize()}>
                      {" "} 同步人员
                    </Button>
                  ) : null}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>

        {/* 允许新增的判断 */}
        {this.state.PoliceAddVisible ? (
          <AddPolice
            visible={this.state.PoliceAddVisible}
            title={this.state.moduletitle}
            handleOk={this.handleOk}
            values={thevalue}
            deptId={this.state.searchKey.deptCode}
            currPeopleId={this.state.currPeopleId}
            type={this.state.moduletype}
            onCancel={this.handleCancel}  // 关闭弹窗
            roleList={userRoleSetResult.list || []}
          />
        ) : null}
        {this.state.RoleVisible ? (
          <SelectRole
            visible={this.state.RoleVisible}
            handleOkRole={() => this.handleOkRole()}
            values={userDetailResult}
            currPeopleId={this.state.currPeopleId}
            select={userRoleSetResult.list}
            onCancel={() => this.handleCancelRole()}
          />
        ) : null}
      </div>
    );
  }
}
