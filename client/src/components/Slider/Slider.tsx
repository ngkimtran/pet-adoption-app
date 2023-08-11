import { LANDING_IMGS } from "../../constants/constants";
import Searchbar from "../Searchbar/Searchbar";

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
        <h1>
          <span className="text-color-primary">Find your</span>
          <span className="text-animated"> new best friend</span>
          <span className="text-color-primary">!</span>
        </h1>
        <p className="fw-semibold fs-4 mt-4">
          Pets are not our whole life, but they make our lives whole.
        </p>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img className="d-block w-100" src={LANDING_IMGS[0]} alt="" />
        </div>

        <div className="carousel-item" data-bs-interval="5000">
          <img className="d-block w-100" src={LANDING_IMGS[1]} alt="" />
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img className="d-block w-100" src={LANDING_IMGS[2]} alt="" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={LANDING_IMGS[3]} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
