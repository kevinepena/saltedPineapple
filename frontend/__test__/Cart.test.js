import { mount } from 'enzyme';
import wait from 'waait';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_CART_QUERY } from '../components/Cart';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem()],
                }
            }
        }
    },
    {
        request: { query: LOCAL_CART_QUERY },
        result: { data: { cartOpen: true } }
    }
];

describe('<Cart />', () => {
    it('renders and matches snap', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Cart />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(toJson(wrapper.find('header'))).toMatchSnapshot();
        expect(wrapper.find('CartItem')).toHaveLength(1);
    });
});