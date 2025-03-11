import React, { useState } from "react";
import "./SignIn.css";
import image from "../../assets/images/planet.jpg";
import StarBackground from "../StarBackground/StarBackground";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Daxil edilən məlumatlar:", values);

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      savedUser &&
      values.username === savedUser.username &&
      values.password === savedUser.password
    ) {
      setMessage("Login successful!");
      setMessageType("success");
      setMessageVisible(true);

      setTimeout(() => {
        setMessageVisible(false);
        form.resetFields(); 
      }, 2000);
    } else {
      setMessage("Username or password is incorrect.!");
      setMessageType("error");
      setMessageVisible(true);

      setTimeout(() => {
        setMessageVisible(false);
        form.resetFields(); 
      }, 3000);
    }
  };

  return (
    <div className="signInPage">
      <img src={image} alt="planet" />
      <StarBackground />
      <div className="login">
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2 className="title">Login</h2>

          {messageVisible && (
            <Alert
              message={message}
              type={messageType}
              showIcon
              closable
              style={{ marginBottom: "20px" }}
            />
          )}

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="formInput" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="formInput" />
          </Form.Item>
          <div className="text">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <p>
              Forgot password?{" "}
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                Click here
              </Link>
            </p>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="button">
              Login
            </Button>
          </Form.Item>
          <p>
            Don't have an account?{" "}
            <Link
              to="/registration"
              style={{ color: "red", textDecoration: "none" }}
            >
              SignUp now
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
