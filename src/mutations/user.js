import {gql} from '@apollo/client';

export const updateUserMutation = gql`
  mutation($userID: ID!, $photo: String, $name: String, $quote: String , $cover: String) {
    updateUser(userID: $userID, photo: $photo, name: $name, quote: $quote, cover:$cover) {
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