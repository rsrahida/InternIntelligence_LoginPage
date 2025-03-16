import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import "./Password.css";

import StarBackground from "../StarBackground/StarBackground";

const Password = () => {
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = (values) => {
    console.log("Email sent to:", values.email);
    setEmailSent(true);
  };

  return (
    <div className="passwordPage">
      <StarBackground />
      <div className="passwordForm">
        <h2 className="forgot">Forgot Password</h2>
        {emailSent && (
          <Alert
            message="Reset link has been sent to your email!"
            type="success"
            showIcon
          />
        )}
        <Form onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Enter your registered email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="button">
              Reset Password
            </Button>
          </Form.Item>
          <p>
            Remember your password{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Password;
