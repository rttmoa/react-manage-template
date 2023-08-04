import React from 'react'
import {Row, Col, Card, List} from 'antd'
import connect from 'connect'





@connect
export default class extends React.Component {
    render () {
        let objName = { "userName": "用户名", "password": "密码", "roles": "角色权限"}
        let user = this.props.state.user; 
        // console.log(user)
        // console.log(Object.keys(user).filter(key => key !== "Auth_Token")) // ['userName', 'password', 'roles']
        let listCom = (
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={Object.keys(user).filter(key => key !== 'Auth_Token')}
                renderItem={key => (
                    <List.Item>
                        <Card title={objName[key]}>{user[key]}</Card>
                    </List.Item>
                )}
            />
        )
	    return (
	        <div className="auth_wrapper"> 
                <Row className="gutter-row">
                    <Col md={24} className="gutter-col">
                        <Card title="当前用户的信息">
                            {listCom}
                        </Card>
                    </Col>
                </Row>
            </div>
	    )
    }
}