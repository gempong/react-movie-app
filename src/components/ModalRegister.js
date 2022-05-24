import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Alert } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../stores/user/userSlice";

function Register(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { success, error, errorMessage, loading } = useSelector(
    (state) => state.user.register
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    dispatch(register(values))
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
    if (props.events) {
      props.events.click = showModal;
    }
  }, [props.events]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <>
      <Modal
        title="Create Account"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {error && <Alert message={errorMessage} type="error" />}
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
            name="first_name"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input
              size="large"
              placeholder="First Name"
              suffix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input
              size="large"
              placeholder="Last Name"
              suffix={<UserOutlined />}
            />
          </Form.Item>
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
          <Form.Item
            name="password_confirmation"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Password Confirmation" />
          </Form.Item>
          <Form.Item className="m-0">
            <Button loading={loading} type="primary" htmlType="submit" size="large">
              Register Now
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
