import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Templates from "../pages/Templets/Templets";
import Editor from "../pages/Editor/Editor";
// import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "templates", element: <Templates /> },
      { path: "editor/:slug", element: <Editor /> },
    //   { path: "*", element: <NotFound /> },
    ],
  },
]);