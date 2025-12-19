import { Button, Input, notification, Row, Col, Divider, message } from "antd";
import Form from "antd/es/form/Form";
import { loginAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";


const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(
            values.email,
            values.password
        )
        if (res.data) {
            message.success(
                "Đăng nhập thành công"
            )
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user);
            navigate("/")
        } else {
            notification.error({
                message: "Login error",
                description: JSON.stringify(res.message)

            })
        }
        setLoading(false)
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #cc", borderRadius: "5px" }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >


                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: 'Email không đúng định dạng! ' }]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    form.submit()
                                }
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "50px", alignItems: "center" }}>
                                <Button loading={loading} onClick={() => {
                                    form.submit()
                                }} type="primary">Login
                                </Button>
                                <Link to={"/"}>Goto Home Page →</Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng kí tại đây</Link></div>
                </fieldset>
            </Col>
        </Row >
    )
};

export default LoginPage;
