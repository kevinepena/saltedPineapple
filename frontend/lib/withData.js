import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_CART_QUERY, LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    cache: new InMemoryCache(),
    // local data
    clientState: {
      resolvers: {
        Items: {
          isInCart: (items, _args, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            console.log(cartItems);
            return items;
          }
        },
        Query: {
          isInCart: (items, _args, { cache }) => {
            const { cartItems } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            console.log(cartItems);
            return items;
          },
          cart(_, variables, client) {
            const cache = client.cache;
            const { cart } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            return cart;
          },
        },
        Mutation: {
          toggleCart(_, variables, client) {
            const cache = client.cache;
            // read cartOpen from cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_CART_QUERY,
            });
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
          addToCart(_, variables, client) {
            const cache = client.cache;
            const { cart } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            const data = {
              data: { cart: [...cart, variables.id] }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false,
        cart: []
      }
    }
  });
}

export default withApollo(createClient);
