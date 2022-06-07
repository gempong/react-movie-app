import React, { useState, useEffect } from "react";
import axios from "axios";
import { Popconfirm, Avatar, Form, Input, Button, Modal, Alert, Upload, message } from "antd";
import { MailOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { reset, getUser, updateUser, API_URL } from "../stores/user/userSlice";

function Profile(props) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { data } = useSelector((state) => state.user.user);
    const { token } = useSelector((state) => state.user.auth);
    const { loading, error, errorMessage } = useSelector((state) => state.user.update);
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState([]);
    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    let defaultValues = {
        first_name: data ? data.first_name : '',
        last_name: data ? data.last_name : '',
        email: data ? data.email : '',
    }

    const onFinish = async (values) => {
        const updateValues = { token, values }
        await dispatch(updateUser(updateValues))
        setIsModalVisible(false);
        form.resetFields()
        setFileList();
        message.success('Profile update successful');
        if (values) {
            defaultValues = values;
            form.setFieldsValue(defaultValues)
        }
        if (token) {
            await dispatch(getUser(token));
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const confirm = async () => {
        if (token) {
            try {
                const response = await axios.delete(`${API_URL}users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsModalVisible(false);
                setFileList();
                dispatch(reset())
                message.success('Account deleted successfully');
                form.resetFields();
                localStorage.removeItem("token");
                return response;
            } catch (err) {
                if (!err.response) {
                    throw err;
                }
                console.log(err.response.data)
            }
        }
    };

    const cancel = (e) => {
        console.log(e);
    };

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
                title="Edit Profile"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {error && <Alert className="mb-6" message={errorMessage} type="error" />}
                {!!data && (
                    <>
                        <Avatar
                            className="mb-6 mx-auto block"
                            size={150}
                            src={data.image ? data.image : `https://ui-avatars.com/api/?name=${data.first_name + ' ' + data.last_name}`}
                        />
                        <Form
                            initialValues={defaultValues}
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
                                className="text-center"
                                name='image'
                                getValueFromEvent={getFile}>
                                <Upload {...uploadProps} listType="picture" accept="image/*">
                                    <Button className="rounded-full" icon={<UploadOutlined />}>Update Profile Picture</Button>
                                </Upload>
                            </Form.Item>

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
                            <Form.Item className="m-0 flex justify-between">
                                <Button
                                    className="w-full rounded-full"
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    Update Profile
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this account?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        className="w-full mt-3 rounded-full"
                                        loading={loading}
                                        type="primary"
                                        htmlType="button"
                                        size="large"
                                        ghost
                                    >
                                        Delete Account
                                    </Button>
                                </Popconfirm>

                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>
        </>
    );
}

export default Profile;
