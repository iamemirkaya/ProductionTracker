import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import App from "../layout/App";
import Product from "../../features/product/Product";
import NotFound from "../layout/NotFound ";
import ProductAdd from "../../features/product/ProductAdd";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Dashboard />},
            {path: 'product', element: <Product />},
            { path: "not-found", element: <NotFound /> },
            {path: 'productadd', element: <ProductAdd />},
            
        ]
    }
])
            
