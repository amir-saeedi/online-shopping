import React from 'react'
import { useNavigate } from "react-router-dom";

import userContext from '../../contexts/user';
import loginImg from "../../illistratons/login.png";
import signUpImg from "../../illistratons/sign-up.png";
import { Button, Checkbox, Form, Input } from 'antd';

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(userContext);
    const [type, setType] = React.useState("signup");
    const toggleType = () => {
        setType(e => e === "login" ? "signup" : "login")
    }
    const [authenticated, setauthenticated] = React.useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const onFinish = async (values) => {
        if (type === "login") {
            return await fetch('http://localhost:3300/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                })
            })
                .then(e => e.json())
                .then((data) => {
                    if (!data) {
                        throw new Error("dosn't exist account!!!");
                    }
                    setUser({
                        token: data.token
                    })
                }).catch(e => console.error(e.message))
        }
        if (type === "signup") {
            return fetch('https://api.freerealapi.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                })
            }).then(e => e.json())
                .then((data) => {
                    if (!data) {
                        throw new Error("dosn't exist account!!!");
                    }
                    setUser({
                        name: values.name,
                        token: data.token
                    })
                }).catch(e => console.error(e.message))
        }
    };
    if (user?.token) {
        navigate("/");
    }
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    return (
        <div className="login-theme">
            <div className='container'>
                <div className='main flex_row'>
                    <div className='auth-image'>
                        <img src={type === "login" ? loginImg : signUpImg} alt="login" />
                    </div>
                    <div className='auth-form'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            {type === "login" ? <FormLogin /> : <FormSignup />}
                            <div className='ant-form-item newAccount' onClick={toggleType} style={type === "login" ? { paddingLeft: "80px" } : { paddingLeft: "0" }}>
                                {type === "login" ? "Need create a new account?" : "You have a account?"}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FormLogin = () => {
    return (
        <React.Fragment>
            <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox style={{
                    color: "rgb(244, 244, 244)"
                }}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </React.Fragment>
    )
}
const FormSignup = () => {
    return (
        <React.Fragment>
            <Form.Item
                label="Username"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    // {
                        // pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                        // message: "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                    // }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox style={{
                    color: "rgb(244, 244, 244)"
                }}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </React.Fragment>
    )
}