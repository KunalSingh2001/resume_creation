import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Templets from "../pages/Templets/Templets";
import Layout from "../components/layout/Layout";
import Editor from "../pages/Editor/Editor";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/templets", element: <Templets /> },
            { path: "/editor/:slug", element: <Editor /> },
        ]
    },
    // { path: "*", element: <NotFound /> },
]);
