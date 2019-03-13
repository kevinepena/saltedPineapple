import { mount } from 'enzyme';
import wait from 'waait';
import toJson from 'enzyme-to-json';
import { ApolloConsumer } from 'react-apollo';
import RemoveFromCart, { REMOVE_FROM_CART } from '../components/RemoveFromCart';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

global.alert = console.log;

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem({ id: 'abc123' })],
                }
            }
        }
    },
    {
        request: { query: REMOVE_FROM_CART, variables: { id: 'abc123' } },
        result: {
            data: {
                removeFromCart: {
                    __typename: 'CartItem',
                    id: 'abc123'
                }
            }
        }
    }
];

describe('<RemoveFromCart />', () => {

    it('renders and matches snap', () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <RemoveFromCart id="abc123" />
            </MockedProvider>
        );
        expect(toJson(wrapper.find('button'))).toMatchSnapshot();
    });

    it('removes an item to cart when clicked', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <RemoveFromCart id='abc123' />
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
        expect(res.data.me.cart).toHaveLength(1);
        expect(res.data.me.cart[0].item.price).toBe(5000);
        wrapper.find('button').simulate('click');
        await wait();
        wrapper.update();
        const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
        expect(res2.data.me.cart).toHaveLength(0);
    });
});