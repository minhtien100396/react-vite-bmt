import "nprogress/nprogress.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthWrapper } from "./components/context/auth.context";
import TodoApp from "./components/todo/TodoApp";
import BookPage from "./pages/book";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import PrivateRoute from "./pages/private.route";
import RegisterPage from "./pages/register";
import UsersPage from "./pages/users";
import "./styles/global.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TodoApp />,
            },
            { path: "/users", element: <UsersPage /> },

            {
                path: "/books",
                element: (
                    <PrivateRoute>
                        <BookPage />
                    </PrivateRoute>
                ),
            },
        ],
    },

    { path: "/login", element: <LoginPage /> },

    { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <AuthWrapper>
        <RouterProvider router={router} />
    </AuthWrapper>
    // </React.StrictMode>
);
