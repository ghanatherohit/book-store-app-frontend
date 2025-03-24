import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Checkout from "../pages/Cart/Checkout.jsx";
import SingleBook from "../pages/Books/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import OrdersPage from "../pages/Orders/OrdersPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/DashBoard/DashboardLayout.jsx";
import Dashboard from "../pages/DashBoard/Dashboard.jsx";
import ManageBooks from "../pages/DashBoard/ManageBooks.jsx";
import EditBook from "../pages/DashBoard/EditBook.jsx";
import AddNewBook from "../pages/DashBoard/AddNewBook.jsx";
// import Pdf from "../components/Pdf.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrdersPage /></PrivateRoute>,
            },
            {
                path: "/about",
                element: <h1>About</h1>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Checkout /></PrivateRoute>,
            },
            {
                path:"/books/:id",
                element: <SingleBook />
            }
        ]
    },
    {
        path: "/adminLogin",
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout/></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard/></AdminRoute>,
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddNewBook/></AdminRoute>,
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><EditBook/></AdminRoute>,   
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks/></AdminRoute>,
            }
        ]
    }
]);

export default router;