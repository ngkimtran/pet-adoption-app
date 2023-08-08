import Searchbar from "../Searchbar/Searchbar";
import "./Slider.css";

const landings = [
  require("../../assets/landing-1.jpg"),
  require("../../assets/landing-2.jpg"),
  require("../../assets/landing-3.jpg"),
  require("../../assets/landing-4.jpg"),
];

const Slider = () => {
  return (
    <div
      id="imageSlider"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#imageSlider"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#imageSlider"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#imageSlider"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#imageSlider"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>

      <div className="slider-searchbar z-3 p-0 m-auto carousel-caption d-none d-md-block">
        <Searchbar />
      </div>

      <div className="slider-caption z-3 p-0 m-auto carousel-caption d-none d-md-block">
        <h1>Find your new best friend!</h1>
        <p className="fw-semibold fs-4 mt-4">
          Pets are not our whole life, but they make our lives whole.
        </p>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img className="d-block w-100" src={landings[0]} alt="" />
        </div>

        <div className="carousel-item" data-bs-interval="5000">
          <img className="d-block w-100" src={landings[1]} alt="" />
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img className="d-block w-100" src={landings[2]} alt="" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={landings[3]} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
