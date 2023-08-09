import Animals from "../../components/Animals/Animals";
import Slider from "../../components/Slider/Slider";
import Suggestion from "../../components/Suggestion/Suggestion";

const Home = () => {
  return (
    <>
      <Slider />
      <hr
        className="m-0 p-0 background-primary border-0 opacity-100"
        style={{ height: "1.5rem" }}
      />
      <Animals />
      <Suggestion />
    </>
  );
};

export default Home;
