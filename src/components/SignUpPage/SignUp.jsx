import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./SignUp.css";
import image from "../../assets/images/planet.jpg";
import StarBackground from "../StarBackground/StarBackground";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    localStorage.setItem("userData", JSON.stringify(values));

    setMessage("Your registration has been successfully completed!");
    setMessageVisible(true);

    setTimeout(() => {
      setMessageVisible(false);
      navigate("/login"); 
    }, 2000);

    form.resetFields();
  };

  const passwordValidation = [
    {
      required: true,
      message: "Please enter your password!",
    },
    {
      min: 8,
      pattern: /[A-Z]/,
      pattern: /[a-z]/,
      pattern: /\d/,
      pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
      message: "Password: 8+ chars, upper, lower, digit, special.",
    },
  ];

  return (
    <div className="signUpPage">
      <img src={image} alt="planet" />
      <StarBackground />
      <div className="register">
        <Form
          form={form}
          name="signUp"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <h2>Registration</h2>

          {messageVisible && (
            <Alert
              message={message}
              type="success"
              showIcon
              closable
              style={{ marginBottom: "20px" }}
            />
          )}

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter a username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
              className="formInput"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              className="formInput"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={passwordValidation}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              className="formInput"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              className="formInput"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="button">
              Register
            </Button>
          </Form.Item>

          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "red", textDecoration: "none" }}>
              Login now
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
