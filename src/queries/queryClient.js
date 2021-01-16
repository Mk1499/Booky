import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL} from '../configs/global';

export const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});
