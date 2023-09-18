import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { useDispatch } from "@/redux";
import { setToken } from "@/redux/modules/user";
import { setTabsList } from "@/redux/modules/tabs";
import { notification } from "@/hooks/useMessage";
import { loginApi } from "@/api/modules/login";
import { ReqLogin } from "@/api/interface";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { message } from "@/hooks/useMessage";
import type { FormInstance, FormProps } from "antd/es/form";
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import usePermissions from "@/hooks/usePermissions";
import md5 from "md5";

/* 自定义表单校验规则 （手机号、验证码） */
const validate = {
  phone(_: any, value: string) {
    value = value.trim();
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (value.length === 0) return Promise.reject(new Error("手机号是必填项!"));
    if (!reg.test(value)) return Promise.reject(new Error("手机号格式有误!"));
    return Promise.resolve();
  },
  code(_: any, value: string) {
    value = value.trim();
    let reg = /^\d{6}$/;
    if (value.length === 0) return Promise.reject(new Error("验证码是必填项!"));
    if (!reg.test(value)) return Promise.reject(new Error("验证码格式有误!"));
    return Promise.resolve();
  }
};

// todo
// todo 登陆业务逻辑
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usp] = useSearchParams();

  const dispatch = useDispatch();

  const { initPermissions } = usePermissions();

  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sendText, setSendText] = useState("发送验证码");
  const [type, setType] = useState("account");

  const onFinish = async (values: ReqLogin) => {
    try {
      // await formRef.validateFields()
      // let { phone, code } = formRef.getFieldsValue()

      // loading
      setLoading(true);
      message.open({ type: "loading", content: "登录中..." });

      // user login
      const { data } = await loginApi({ ...values, password: md5(values.password) });
      console.log(data);
      dispatch(setToken(data.access_token));
      // 存储Token + 派发任务存储redux
      // _.storage.set('tk', token)
      // await queryUserInfoAsync()

      // clear last account tabs
      dispatch(setTabsList([]));

      // todo 初始化权限： 获取用户按钮权限 && 获取用户菜单权限
      await initPermissions(data.access_token);

      // prompt for successful login and redirect
      notification.success({
        message: getTimeState(),
        description: "欢迎登录 Hooks-Admin",
        icon: <CheckCircleFilled style={{ color: "#73d13d" }} />
      });

      // navigate to home
      navigate(HOME_URL);

      // let to = usp.get("to");
      // to ? navigate(to, { replace: true }) : navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(121);
      setLoading(false);
      message.destroy();
    }
  };
  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    document.onkeydown = event => {
      if (event.code === "Enter") {
        event.preventDefault();
        formRef.current?.submit();
      }
    };
    return () => {
      document.onkeydown = () => {};
    };
  }, []);

  // .
  // .
  // todo =========》  发送验证码
  let timer: string | number | NodeJS.Timeout | null | undefined = null,
    num = 31;
  const CountDown = () => {
    num--;
    if (num === 0) {
      clearInterval(timer!);
      timer = null;
      setSendText("发送验证码");
      setDisabled(false);
      return;
    }
    setSendText(`${num}秒后重发`);
  };
  const sendCode = async () => {
    try {
      await formRef.current?.validateFields(["username"]);
      let userName = formRef.current?.getFieldValue("username");
      if (userName !== "15303663375") return;
      // 模拟调用后台接口 成功
      // let { code } = await api.sendPhoneCode(phone);
      setDisabled(true);
      CountDown();
      if (!timer) timer = setInterval(CountDown, 1000);
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);

  return (
    <div className="login-form-content">
      <Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {/* <Tabs
          activeKey={type}
          onChange={setType}
          centered
          items={[
            { key: "account", label: "账户密码登陆" },
            { key: "mobile", label: "手机号登陆" }
          ]}
        /> */}
        {type === "account" && (
          <>
            <Form.Item
              name="username"
              initialValue="15303663375"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="User：admin / user" />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue="Wenc1101"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              {/* <Input.Password prefix={<LockOutlined />} placeholder="Password：123456" /> */}
              <Input
                suffix={
                  <Button type="primary" size="small" onClick={sendCode}>
                    {sendText}
                  </Button>
                }
              />
            </Form.Item>
          </>
        )}

        <Form.Item className="login-form-button">
          <Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" shape="round" icon={<UserOutlined />} loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
