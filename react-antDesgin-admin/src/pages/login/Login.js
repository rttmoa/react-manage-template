import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import './login.css';




class Login extends React.Component {
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.username === 'admin1' && values.password === '123') {
          window.localStorage.setItem('loggedIn', true);
          this.props.history.push('/');
        } else {
          message.error('账号或密码错误', 1);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const loggedIn = window.localStorage.getItem('loggedIn'); // null
    const LoginForm = (
      // CSS背景：
      <div className="login-container">
        {/* CSS表单居中：使用CSS3方式 */}
        <Form onSubmit={this.handleSubmit} className="login-form">
          {/* CSS: 内边距、字体大小、字体颜色、字体居中 */}
          <div className="sub-title">登 录</div>
          <Form.Item>
            { getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              // CSS图标颜色：rgba(0,0,0,0.25)
              <Input prefix={<Icon type="user" className='login-icon' />} placeholder="用户名admin"/>,
            )}
          </Form.Item>
          <Form.Item>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" className='login-icon'/>} type="password" placeholder="密码123"/>,
            )}
          </Form.Item>
          <Form.Item>
            {/* CSS居中：block、margin: 0 auto */}
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </Form.Item>
          <h3>账户：admin1， 密码：123</h3>
        </Form> 
      </div>
    );
    return (
      loggedIn ? ( <Redirect to="/"/> ) : LoginForm
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;


