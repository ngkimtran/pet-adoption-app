import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pets from "./pages/Pets/Pets";
import SinglePet from "./pages/SinglePet/SinglePet";

const Layout = () => (
  <>
    <Header />
    <div className="container-fluid px-0 bg-offwhite app">
      <Outlet />
    </div>
    <Footer />
  </>
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
        path: "/:animal/browse-pets",
        element: <Pets />,
      },
      {
        path: "/:animal/:id",
        element: <SinglePet />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
