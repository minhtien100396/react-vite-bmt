import { Spin } from "antd";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth.context";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import "./components/todo/todo.css";
import { getAccountAPI } from "./services/api.service";

const App = () => {
    const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        if (res.data) {
            //success
            setIsAppLoading(false);
            setUser(res.data.user);
        }
    };

    return (
        <>
            {isAppLoading === true ? (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;
