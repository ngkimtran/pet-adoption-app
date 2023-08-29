import { Helmet } from "react-helmet";
import AdoptionForm from "../../components/AdoptionForm/AdoptionForm";

const Adopt = () => (
  <>
    <Helmet>
      <title>Adopt a pet</title>
    </Helmet>
    <AdoptionForm />
  </>
);

export default Adopt;
