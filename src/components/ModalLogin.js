import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { auth, getUser } from "../stores/user/userSlice";

function Login(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { token, loading, success, error, errorMessage } = useSelector(
        (state) => state.user.auth
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
        await dispatch(auth(values));
        await dispatch(getUser(token));
        if(success){
            setIsModalVisible(false);
            form.resetFields()
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if(token){
            dispatch(getUser(token));
        }
        setIsModalVisible(false);
        form.resetFields()
    }, [success, dispatch, form, token]);

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
                forceRender
                title="Log In to Your Account"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {error && <Alert className="mb-6" message={errorMessage} type="error" />}
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
                    <Form.Item className="m-0">
                        <Button
                            className="rounded-full"
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
