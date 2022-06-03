import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";

import { Form, Input, Button, Row, Col, Avatar, Dropdown, Menu } from "antd";
import { SearchOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

import Register from "../components/ModalRegister";
import Login from "../components/ModalLogin";
import EditProfile from "../components/ModalEditProfile";

import { useDispatch, useSelector } from "react-redux";
import { reset, getUser } from "../stores/user/userSlice";

function Navbar() {
    const history = useHistory();
    const [searchIsOpen, setSearchMobile] = useState(false);
    const [form] = Form.useForm();
    const { token } = useSelector((state) => state.user.auth);

    const { data } = useSelector(
        (state) => state.user.user
    );

    const dispatch = useDispatch();
    const registerEvents = { click: () => { } };
    const loginEvents = { click: () => { } };
    const editProfileEvents = { click: () => { } };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(reset())
    };

    const handleClick = ({ key }) => {
        console.log(key)
    }

    const onFinish = async (values) => {
        setSearchMobile(false);
        history.push("/search/" + values.search);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const openSearch = () => {
        setSearchMobile(true);
    }

    const closeSearch = () => {
        setSearchMobile(false);
    }

    useEffect(() => {
        if (token) {
            dispatch(getUser(token));
        }
    }, [dispatch, token]);

    const menu = (
        <Menu onClick={handleClick} className="mt-3">
            <Menu.Item key="Profile" onClick={() => editProfileEvents.click()}>Edit Profile</Menu.Item>
            <Menu.Item key="Logout" onClick={logOut}>Log Out</Menu.Item>
        </Menu>
    );

    const mobileMenu = (
        <Menu onClick={handleClick} className="mt-3">
            <Menu.Item key="Profile" onClick={() => loginEvents.click()}>Login</Menu.Item>
            <Menu.Item key="Logout" onClick={() => registerEvents.click()}>Register</Menu.Item>
        </Menu>
    );

    return (
        <header className="relative">
            <div className="navbar py-5 absolute z-10 w-full">
                <div className="container mx-auto xl:px-0 px-4">
                    <Row className="items-center justify-between">
                        <Col span={8}>
                            <Link to="/">
                                <img src={Logo} alt="Logo" />
                            </Link>
                        </Col>
                        <Col span={8} className="hidden sm:block">
                            <Form
                                form={form}
                                name="register"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="search"
                                    className="mb-0">
                                    <Input
                                        size="large"
                                        placeholder="What do you want to watch?"
                                        suffix={<SearchOutlined />}
                                        className="bg-transparent"
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={8} className="flex justify-end items-center">
                            <SearchOutlined onClick={openSearch} className="block sm:hidden text-white text-xl mr-5 leading-3" />
                            {!data && (
                                <>
                                    <Dropdown overlay={mobileMenu} placement="bottomRight">
                                        <UserOutlined className="block sm:hidden text-white text-2xl leading-3" />
                                    </Dropdown>
                                    <Button
                                        ghost
                                        className="hidden sm:block mr-3 min-w-[100px]"
                                        type="primary"
                                        size="large"
                                        onClick={() => loginEvents.click()}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="hidden sm:block min-w-[100px]"
                                        type="primary"
                                        size="large"
                                        onClick={() => registerEvents.click()}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                            {!!data && (
                                <>
                                    <Dropdown
                                        overlay={menu}
                                        trigger={["click"]}

                                    >
                                        <div onClick={(e) => e.preventDefault()} className="flex items-center cursor-pointer select-none">
                                            <Avatar size="large" src={data.image ? data.image : `https://ui-avatars.com/api/?name=${data.first_name + ' ' + data.last_name}`} />
                                            <span className="hidden sm:block text-white ml-3 text-lg">{data.first_name + ' ' + data.last_name}</span>
                                        </div>
                                    </Dropdown>
                                </>
                            )}
                        </Col>
                    </Row>
                </div>
                {searchIsOpen && (
                    <div className="search-mobile block sm:hidden">
                        <CloseOutlined onClick={closeSearch} className="text-white absolute text-xl right-4 top-5" />
                        <Form
                            className="w-full"
                            form={form}
                            name="register"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="search"
                                className="mb-0">
                                <Input
                                    size="large"
                                    placeholder="What do you want to watch?"
                                    suffix={<SearchOutlined />}
                                    className="bg-transparent"
                                />
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
            <Register events={registerEvents} />
            <Login events={loginEvents} />
            <EditProfile events={editProfileEvents} />
        </header>
    );
}

export default Navbar;
