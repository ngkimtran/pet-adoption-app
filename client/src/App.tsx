import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container-fluid px-0">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
