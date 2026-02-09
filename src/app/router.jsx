import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Templets from "../pages/Templets/Templets";
import Layout from "../components/layout/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/templets", element: <Templets /> },
        ]
    },
    // { path: "*", element: <NotFound /> },
]);