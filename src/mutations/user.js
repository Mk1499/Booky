import {gql} from '@apollo/client';

export const updateUserMutation = gql`
  mutation($userID: ID!, $photo: String, $name: String, $quote: String,$lang:String) {
    updateUser(userID: $userID, photo: $photo, name: $name, quote: $quote, lang:$lang) {
      id
    }
  }
`;

export const updateUserLangMutation = gql`
  mutation($userID: ID!, $lang:String){
    updateUserLang(userID:$userID, lang:$lang){
      id
    }
  }

`