import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pets from "./pages/Pets/Pets";
import SinglePet from "./pages/SinglePet/SinglePet";

const Layout = () => (
  <div className="bg-offwhite ">
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
