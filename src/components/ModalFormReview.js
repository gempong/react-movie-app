import React, { useState, useEffect } from "react";
import { Rate, Form, Input, Button, Modal, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, postReviews, editReviews } from "../stores/reviews/reviewSlice";

function FormReviews(props) {
    const { TextArea } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { token } = useSelector(
        (state) => state.user.auth
    );
    const { errorMessage, error, loading } = useSelector(
        (state) => state.reviews.post
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
        let id = props.movie;
        if (props.edit) {
            id = props.reviewsValue._id;
            await dispatch(editReviews({ id, values, token }))
        } else {
            await dispatch(postReviews({ id, values, token }))
        }

        await dispatch(fetchReviews())
        setIsModalVisible(false);
        if (!error) {
            message.success('Your reviews posted successful');
        } else {
            message.error(errorMessage);
        }
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (props.events) {
            props.events.click = showModal;
        }
    }, [props.events]);

    useEffect(() => {
        if (props.edit === true) {
            form.setFieldsValue(props.reviewsValue)
        } else {
            form.resetFields()
        }
    }, [form, props.events, props.edit, props.reviewsValue]);

    return (
        <>
            <Modal
                forceRender
                title="Leave a Comment"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
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
                    <Form.Item name="rating">
                        <Rate className="text-2xl" count={10} />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: "Please input your review title!" }]}
                    >
                        <Input
                            className="rounded-full px-5"
                            size="large"
                            placeholder="Title"
                        />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: "Please input your review!" }]}
                    >
                        <TextArea
                            className="rounded-3xl px-5"
                            rows={4}
                            placeholder="Leave a Comment!"
                        />
                    </Form.Item>
                    <Form.Item className="m-0">
                        <Button className="rounded-full" loading={loading} type="primary" htmlType="submit" size="large">
                            Post Now
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default FormReviews;
