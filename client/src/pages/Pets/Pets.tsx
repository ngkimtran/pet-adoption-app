import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GET_PETS } from "../../queries/petQueries";
import { toCapitalize } from "../../utilities/utilities";
import PetList from "../../components/PetList/PetList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import PetCategory from "../../components/PetCategory/PetCategory";

const Pets = () => {
  const { animal } = useParams();
  const [getPets, petsQueryResult] = useLazyQuery(GET_PETS);

  useEffect(() => {
    animal
      ? getPets({
          variables: { type: animal },
        })
      : getPets();
  }, [animal, getPets]);

  return (
    <>
      {!animal && (
        <>
          <Helmet>
            <title>Pets for adoption</title>
          </Helmet>
          <div className="container-fluid m-0 p-0">
            <PetCategory />
          </div>
        </>
      )}
      {animal && (
        <>
          <Helmet>
            <title>{toCapitalize(animal)}s for adoption</title>
          </Helmet>
          <div className="container-fluid m-0 p-0">
            <>
              {petsQueryResult.loading && <Loader />}
              {petsQueryResult.error && <Error />}
              {!petsQueryResult.loading &&
                !petsQueryResult.error &&
                petsQueryResult.data && (
                  <PetList pets={petsQueryResult.data?.pets} animal={animal} />
                )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Pets;
