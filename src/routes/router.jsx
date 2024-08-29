import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Details from "../views/Details"
import LoginPage from "../views/Loginpage";
import AddPage from "../views/AddPage";
import Toastify from "toastify-js";
import EditPage from "../views/EditPage";
import CategoryMenu from "../views/Categories";
import AddPageCategories from "../views/AddPageCategories";
import EditCategories from "../views/EditCategories";
import AddUser from "../views/UserAdd";
 const url = 'https://h8-phase2-gc.vercel.app'

 const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage url={url} />,
        loader: () => {
          if (localStorage.access_token) {
            Toastify({
              text: "You already logged in",
              duration: 2000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "left",
              stopOnFocus: true,
              style: {
                background: "#EF4C54",
                color: "#17202A",
                boxShadow: "0 5px 10px black",
                fontWeight: "bold",
              },
            }).showToast();
            return redirect("/");
          }
    
          return null;
        },
      },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
              Toastify({
                text: "Please login first",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                  background: "#EF4C54",
                  color: "#17202A",
                  boxShadow: "0 5px 10px black",
                  fontWeight: "bold",
                },
              }).showToast();
              return redirect("/login");
            }
      
            return null;
          },
        children: [
            {
                path: "/",
                element: <Home url={url}/>
            },
            {
                path: "/detail/:id",
                element: <Details url={url}/>
            },
            {
                path: "/add",
                element: <AddPage url={url} />,
            },
            {
              path: "/edit/:id",
              element: <EditPage url={url} />,
            },
            {
              path: "/categories",
              element: <CategoryMenu url={url} />,
            },
            {
              path: "/categories/add",
              element: <AddPageCategories url={url} />,
            },
            {
              path: "/categories/edit/:id",
              element: <EditCategories url={url} />,
            },
            {
              path: "/users/add",
              element: <AddUser url={url} />,
            },
        ]
    }
 ])

 export default router