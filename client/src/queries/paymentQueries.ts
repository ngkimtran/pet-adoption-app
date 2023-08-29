import { gql } from "@apollo/client";

const CREATE_CHECKOUT_SESSION = gql`
  query createCheckoutSession($petName: String!, $adoptionFee: Float!) {
    createCheckoutSession(petName: $petName, adoptionFee: $adoptionFee)
  }
`;

export { CREATE_CHECKOUT_SESSION };
