import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { userState } from "../../states/state";
import { MANAGEMENT_COMPONENT } from "../../constants/constants";
import AnimalsManagement from "../../components/AnimalsManagement/AnimalsManagement";
import PetsManagement from "../../components/PetsManagement/PetsManagement";
import UsersManagement from "../../components/UsersManagement/UsersManagement";

const Admin = () => {
  const [user] = useRecoilState(userState);
  const [managementComponent, setManagementComponent] = useState<
    MANAGEMENT_COMPONENT | undefined
  >(undefined);
  const navigate = useNavigate();

  if (user?.role === "USER") navigate("/");

  return (
    <>
      <Helmet>
        <title>Admin panel</title>
      </Helmet>
      {user && (
        <div className="container-fluid m-0 p-0">
          <div className="d-flex align-items-start">
            {/* Nav */}
            <ul
              style={{ flex: "0.21", minHeight: "90vh" }}
              className="list-group list-group-flush bg-white mx-2 my-4 rounded"
            >
              <li
                className={`list-group-item px-5 py-4 fs-5 nav-text ${
                  managementComponent === MANAGEMENT_COMPONENT.ANIMAL &&
                  "active"
                }`}
                onClick={() =>
                  setManagementComponent(MANAGEMENT_COMPONENT.ANIMAL)
                }
              >
                Animals management
              </li>
              <li
                className={`list-group-item px-5 py-4 fs-5 nav-text ${
                  managementComponent === MANAGEMENT_COMPONENT.PET && "active"
                }`}
                onClick={() => setManagementComponent(MANAGEMENT_COMPONENT.PET)}
              >
                Pets management
              </li>
              <li
                className={`list-group-item px-5 py-4 fs-5 nav-text ${
                  managementComponent === MANAGEMENT_COMPONENT.USER && "active"
                }`}
                onClick={() =>
                  setManagementComponent(MANAGEMENT_COMPONENT.USER)
                }
              >
                Users management
              </li>
            </ul>

            {/* Content */}
            <div
              style={{ flex: "0.79", minHeight: "90vh" }}
              className="row row-cols-auto bg-white mx-2 my-4 px-3 py-4 rounded"
            >
              {!managementComponent && (
                <div className="d-flex justify-content-center align-items-center w-100 text-black-50 fw-bold">
                  <h3>
                    Choose a category from the navigation panel on the left
                  </h3>
                </div>
              )}
              {managementComponent === MANAGEMENT_COMPONENT.ANIMAL && (
                <AnimalsManagement />
              )}
              {managementComponent === MANAGEMENT_COMPONENT.PET && (
                <PetsManagement />
              )}
              {managementComponent === MANAGEMENT_COMPONENT.USER && (
                <UsersManagement />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
