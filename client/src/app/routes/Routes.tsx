import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import MainLayout  from "../layout/MainLayout";
import Product from "../../features/product/Product";
import NotFound from "../layout/NotFound ";
import CreateProduct from "../../features/product/CreateProduct";
import UpdateProduct from "../../features/product/UpdateProduct";
import Workshop from "../../features/workshop/Workshop";
import CreateWorkshop from "../../features/workshop/CreateWorkshop";
import UpdateWorkshop from "../../features/workshop/UpdateWorkshop";
import Shift from "../../features/shift/Shift";
import CreateShift from "../../features/shift/CreateShift";
import UpdateShift from "../../features/shift/UpdateShift";
import Production from "../../features/ProductLog/Production";
import LoginPage from "../../features/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../../features/auth/RegisterPage";
import AuthLayout from "../layout/AuthLayout";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'not-found', element: <NotFound /> }
        ]
    },
    {
        path: '/',
        element: <MainLayout  />,
        children: [
            { 
                element: <ProtectedRoute />, 
                children: [
                    {path: '', element: <Dashboard />},
                    {path: 'product', element: <Product />},
                    {path: 'productadd', element: <CreateProduct />},
                    { path: 'update-product/:id', element: <UpdateProduct /> },
                    {path: 'workshop', element: <Workshop />},
                    {path: 'createWorkshop', element: <CreateWorkshop />},
                    { path: 'update-workshop/:id', element: <UpdateWorkshop /> },
                    {path: 'shift', element: <Shift />},
                    {path: 'createShift', element: <CreateShift/>},
                    { path: 'update-shift/:id', element: <UpdateShift /> },
                    {path: 'production', element: <Production />},
                ]
            }           
        ]
    }
])
            
