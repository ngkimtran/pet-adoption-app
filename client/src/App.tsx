import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Pets from "./pages/Pets/Pets";
import SinglePet from "./pages/SinglePet/SinglePet";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Favorites from "./pages/Favorites/Favorites";
import { tokenState, userState } from "./states/state";
import { CURRENT_USER } from "./queries/userQueries";
import Adopt from "./pages/Adopt/Adopt";
import About from "./pages/About/About";

const Layout = () => (
  <div className="bg-offwhite ">
    <ToastContainer limit={1} />
    <Header />
    <div className="container-fluid px-0 app">
      <Outlet />
    </div>
    <Footer />
  </div>
);

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
        path: "/browse-pets/:animal",
        element: <Pets />,
      },
      {
        path: "/browse-pets/:animal/:id",
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
      {
        path: "/:userId",
        element: <Profile />,
      },
      {
        path: "/:userId/favorites",
        element: <Favorites />,
      },
      {
        path: "/:userId/admin-panel",
        element: <Admin />,
      },
      {
        path: "/adopt",
        element: <Adopt />,
      },
      {
        path: "/about",
        element: <About />,
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
