import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Alert, message } from "antd";
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
        await dispatch(register(values))
        if(success){
            message.success('Your registration successful');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
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
                forceRender
                title="Create Account"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {error && <Alert message={errorMessage} className="mb-6" type="error" />}
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
                            className="rounded-full px-5"
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
                            className="rounded-full px-5"
                            size="large"
                            placeholder="Last Name"
                            suffix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: "email", message: "Please input your email!" }]}
                    >
                        <Input
                            className="rounded-full px-5"
                            size="large"
                            placeholder="Email Address"
                            suffix={<MailOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password className="rounded-full px-5" size="large" placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password className="rounded-full px-5" size="large" placeholder="Password Confirmation" />
                    </Form.Item>
                    <Form.Item className="m-0">
                        <Button loading={loading} className="rounded-full" type="primary" htmlType="submit" size="large">
                            Register Now
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Register;
