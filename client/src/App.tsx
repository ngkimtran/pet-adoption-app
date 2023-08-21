import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Pets from "./pages/Pets/Pets";
import SinglePet from "./pages/SinglePet/SinglePet";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { tokenState, userState } from "./states/state";
import { CURRENT_USER } from "./queries/userQueries";

const Layout = () => {
  return (
    <div className="bg-offwhite ">
      <ToastContainer limit={1} />
      <Header />
      <div className="container-fluid px-0 app">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:animal/browse-pets",
        element: <Pets />,
      },
      {
        path: "/:animal/:id",
        element: <SinglePet />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  const [token] = useRecoilState(tokenState);
  const [, setUser] = useRecoilState(userState);

  useQuery(CURRENT_USER, {
    skip: !token,
    onCompleted: (data) => setUser(data?.me),
  });

  return <RouterProvider router={router} />;
};

export default App;
