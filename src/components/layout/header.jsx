import {
    AliwangwangOutlined,
    BookOutlined,
    HomeOutlined,
    LoginOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../services/api.service";
import { AuthContext } from "../context/auth.context";

const Header = () => {
    const [current, setCurrent] = useState("");
    const location = useLocation();
    useEffect(() => {
        if (location && location.pathname) {
            const allRouters = ["users", "books"];
            const currentRoute = allRouters.find(
                (item) => `/${item}` === location.pathname
            );
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location.pathname]);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            });
            message.success("Logout thành công");
            //redirect
            navigate("/");
        }
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UsergroupDeleteOutlined />,
        },

        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },

        ...(!user.id
            ? [
                  {
                      label: <Link to={"/login"}>Đăng nhập</Link>,
                      key: "login",
                      icon: <LoginOutlined />,
                  },
              ]
            : []),

        ...(user.id
            ? [
                  {
                      label: `Welcome ${user.fullName}`,
                      key: "setting",
                      icon: <AliwangwangOutlined />,
                      children: [
                          {
                              label: (
                                  <span onClick={() => handleLogout()}>
                                      Đăng xuất
                                  </span>
                              ),
                              key: "logout",
                          },
                      ],
                  },
              ]
            : []),
    ];

    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;
