import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Dropdown} from 'antd'
import connect from 'connect'
import { Cookie } from 'utils/storage'
import './index.less'

const Item = Menu.Item;

 

const menu = (user = {}, history, clearUser) => (
    <Menu>
        <Item>{user && user.userName}</Item>
        <Item><a href="https://github.com/cd-dongzi" target='_black'>Github</a></Item>
        <Item>
            <span onClick={e => {
                Cookie.remove('Auth_Token');
                clearUser();
                history.push('/login');
            }}>退出</span>
        </Item>
    </Menu>
)

/** #### 用户名，跳转Github，退出系统  */
@connect
@withRouter
export default class Account extends React.Component {
    
    render () {
        const { state, history, clearUser } = this.props;
        return (
            <div className="account_wrapper">
                <Dropdown overlay={menu(state.user, history, clearUser)} placement="bottomLeft">
                    <div className="avatar bg-cover-all"></div> 
                </Dropdown>
            </div>
        )
    }
}