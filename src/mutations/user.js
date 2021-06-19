import {gql} from '@apollo/client';

export const updateUserMutation = gql`
  mutation($userID: ID!, $photo: String, $name: String, $quote: String) {
    updateUser(userID: $userID, photo: $photo, name: $name, quote: $quote) {
      id
    }
  }
`;
