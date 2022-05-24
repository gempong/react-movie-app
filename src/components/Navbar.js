import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";

import { Input, Button, Row, Col, Avatar, Dropdown, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Register from "../components/ModalRegister";
import Login from "../components/ModalLogin";

import { useDispatch, useSelector } from "react-redux";
import { reset } from "../stores/user/userSlice";

function Navbar() {
  const { data } = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const registerEvents = { click: () => {} };
  const loginEvents = { click: () => {} };

  console.log(data);

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(data);
  }, [data]);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
    dispatch(reset())
  };

  const handleClick = ({key}) => {
    console.log(key)
  }

  const menu = (
    <Menu onClick={handleClick} className="mt-3">
      <Menu.Item key="Recommend">Edit Profile</Menu.Item>
      <Menu.Item key="Newest" onClick={logOut}>Log Out</Menu.Item>
    </Menu>
  );

  return (
    <header className="relative">
      <div className="navbar py-5 absolute z-10 w-full">
        <div className="container mx-auto">
          <Row className="items-center">
            <Col span={8}>
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </Col>
            <Col span={8}>
              <Input
                size="large"
                placeholder="What do you want to watch?"
                suffix={<SearchOutlined />}
                className="bg-transparent"
              />
            </Col>
            <Col span={8} className="flex justify-end">
              {!user && (
                <>
                  <Button
                    ghost
                    className="mr-3 min-w-[100px]"
                    type="primary"
                    size="large"
                    onClick={() => loginEvents.click()}
                  >
                    Login
                  </Button>
                  <Button
                    className="min-w-[100px]"
                    type="primary"
                    size="large"
                    onClick={() => registerEvents.click()}
                  >
                    Register
                  </Button>
                </>
              )}
              {!!user && (
                <>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    
                  >
                    <a onClick={(e) => e.preventDefault()} className="flex items-center">
                      <Avatar size="large" src={user.image ? user.image : `https://ui-avatars.com/api/?name=${user.first_name + ' ' + user.last_name}`} />
                      <span className="text-white ml-3 text-lg">{user.first_name + ' ' + user.last_name}</span>
                    </a>
                  </Dropdown>
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
      <Register events={registerEvents} />
      <Login events={loginEvents} />
    </header>
  );
}

export default Navbar;
