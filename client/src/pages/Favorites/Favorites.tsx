import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { userState } from "../../states/state";
import { PLACEHOLDER_IMG } from "../../constants/constants";

const Favorites = () => {
  const [user] = useRecoilState(userState);

  return (
    <>
      {user && (
        <div>
          <div className="background-primary">
            <div className="py-1 text-color-dark ps-5 ms-5">
              <div className="container">
                <h2 className="my-3 fw-semibold">
                  My Favorite Pets ({user.favorites.length})
                </h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row row-cols-auto gap-5 m-5">
              {user.favorites.map((pet) => (
                <div
                  key={pet.id}
                  className="col card p-0"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/${pet.type.name}/${pet.name.toLowerCase()}-${pet.id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={PLACEHOLDER_IMG}
                      className="card-img-top object-fit-cover"
                      style={{ width: "250px", height: "250px" }}
                      alt=""
                    />
                    <div className="card-body pb-4 text-center">
                      <h4 className="card-title text-color-secondary mb-3">
                        {pet.name}
                      </h4>
                      <p
                        className="text-color-dark card-text text-capitalize d-flex flex-column justify-content-between"
                        style={{ minHeight: "5rem" }}
                      >
                        <span className="m-0 d-block">
                          {pet.characteristic.age}
                          <span className="px-2">&#x2022;</span>
                          {pet.breed}
                        </span>
                        <span className="fw-semibold">{pet.location}</span>
                      </p>
                    </div>
                  </Link>
                  <Link
                    to={"/"}
                    className="card-footer btn btn-primary text-uppercase fw-semibold"
                  >
                    Start adoption process
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;