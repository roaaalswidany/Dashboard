import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import LogIn from "./Pages/LogIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Auth from "./pages/Auth.jsx";
import Root from "./pages/Root.jsx";
import Items from "./pages/Items.jsx";
import CreateItem from "./pages/CreateItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <SignUp /> },
      { path: "login", element: <LogIn /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      { path: "", element: <Items /> },
      { path: "item/create", element: <CreateItem /> },
      { path: "item/edit/:id", element: <EditItem /> },
    ],
  },
  (basename: "/Dashboard"),
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
