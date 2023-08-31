import { Helmet } from "react-helmet";
import AnimalList from "../../components/AnimalList/AnimalList";
import Slider from "../../components/Slider/Slider";
import Suggestion from "../../components/Suggestion/Suggestion";

const Home = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Slider />
    <hr
      className="m-0 p-0 background-primary border-0 opacity-100"
      style={{ height: "1.5rem" }}
    />
    <AnimalList />
    <Suggestion />
  </>
);

export default Home;
