import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { GoogleLogin } from "react-google-login";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../stores/user/userSlice";

function Login(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { loading, success, error, errorMessage } = useSelector(
    (state) => state.user.auth
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const responseGoogle = (response) => {
    console.log(response);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    dispatch(auth(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log('closed')
    setIsModalVisible(false);
    form.resetFields()
  }, [success, form]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (props.events) {
      props.events.click = showModal;
    }
  }, [props.events]);

  return (
    <>
      <Modal
        title="Log in"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {error && <Alert className="mb-6" message={errorMessage} type="error" />}
        <GoogleLogin
          className="w-full flex items-center justify-center mb-6"
          clientId="436786306485-rhtih7b5c92ir6g1vimhjn17rgqe42pv.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <Form
          form={form}
          name="register"
          layout="vertical"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              size="large"
              placeholder="Email Address"
              suffix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
