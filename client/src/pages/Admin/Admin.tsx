import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../states/state";
import { ManagementComponent } from "../../constants/constants";
import AnimalsManagement from "../../components/AnimalsManagement/AnimalsManagement";
import PetsManagement from "../../components/PetsManagement/PetsManagement";
import UsersManagement from "../../components/UsersManagement/UsersManagement";

const Admin = () => {
  const [user] = useRecoilState(userState);
  const [managementComponent, setManagementComponent] = useState<
    ManagementComponent | undefined
  >(undefined);
  const navigate = useNavigate();

  if (user?.role === "USER") navigate("/");

  return (
    <>
      {user && (
        <div className="container-fluid m-0 p-0">
          <div className="d-flex align-items-start">
            {/* Nav */}
            <ul
              style={{ flex: "0.21", minHeight: "90vh" }}
              className="list-group list-group-flush bg-white mx-2 my-4 rounded"
            >
              <li
                className="list-group-item px-5 py-4 fs-5 nav-text"
                onClick={() =>
                  setManagementComponent(ManagementComponent.ANIMAL)
                }
              >
                Animals management
              </li>
              <li
                className="list-group-item px-5 py-4 fs-5 nav-text"
                onClick={() => setManagementComponent(ManagementComponent.PET)}
              >
                Pets management
              </li>
              <li
                className="list-group-item px-5 py-4 fs-5 nav-text"
                onClick={() => setManagementComponent(ManagementComponent.USER)}
              >
                Users management
              </li>
            </ul>

            {/* Content */}
            <div
              style={{ flex: "0.79" }}
              className="row row-cols-auto bg-white mx-2 my-4 px-3 py-4 rounded"
            >
              {managementComponent === ManagementComponent.ANIMAL && (
                <AnimalsManagement />
              )}
              {managementComponent === ManagementComponent.PET && (
                <PetsManagement />
              )}
              {managementComponent === ManagementComponent.USER && (
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
