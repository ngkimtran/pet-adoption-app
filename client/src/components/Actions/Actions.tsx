import { Link } from "react-router-dom";

const Actions = () => {
  return (
    <div
      className="container-fluid bg-white mb-5 p-5 border d-flex flex-column align-items-center justify-content-evenly"
      style={{ minHeight: "430px" }}
    >
      <h2
        className="fw-medium text-secondary mb-5"
        style={{ letterSpacing: ".5px", fontSize: "2.3rem" }}
      >
        Planning to Adopt?
      </h2>
      <div className="d-flex align-items-center justify-content-center gap-5 w-100">
        <div
          className="d-flex flex-column align-items-center justify-content-between text-center"
          style={{ flex: ".3", height: "200px" }}
        >
          <div>
            <h4 className="text-color-secondary pb-2">View list of pets</h4>
            <p className="px-4 text-black-50 fs-5">
              See our wonderful list of pets, categorized for your convenience.
            </p>
          </div>
          <Link
            to={`/browse-pets/cat`}
            className="action-btn rounded-pill text-decoration-none"
          >
            Browse
          </Link>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-between text-center"
          style={{ flex: ".3", height: "200px" }}
        >
          <div>
            <h4 className="text-color-secondary pb-2">Read our FAQs</h4>
            <p className="px-4 text-black-50 fs-5">
              Read answers to questions you're wondering about.
            </p>
          </div>
          <Link
            to={`/faq`}
            className="action-btn rounded-pill text-decoration-none"
          >
            Browse
          </Link>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-between text-center"
          style={{ flex: ".3", height: "200px" }}
        >
          <div>
            <h4 className="text-color-secondary pb-2">
              Fill the adoption form
            </h4>
            <p className="px-4 text-black-50 fs-5">
              Already have a pet that caught your eyes? Fill the form and adopt
              your new friend before it's too late!
            </p>
          </div>
          <Link
            to={`/adopt`}
            className="action-btn rounded-pill text-decoration-none"
          >
            Browse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Actions;
