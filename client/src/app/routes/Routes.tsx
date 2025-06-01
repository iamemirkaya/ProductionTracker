import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import App from "../layout/App";
import Product from "../../features/product/Product";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Dashboard />},
            {path: 'product', element: <Product />},
        ]
    }
])