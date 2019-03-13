import { mount } from 'enzyme';
import wait from 'waait';
import { CURRENT_USER_QUERY } from '../components/User';
import Nav from '../components/Nav';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import toJson from 'enzyme-to-json';

const notSignedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: null } },
    },
];


const signedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: fakeUser() } },
    },
];
const signedInMocksWithCartItems = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
                }
            }
        },
    },
];

describe('<Nav />', () => {
    it('renders a minimal nav when signed out', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        expect(toJson(nav)).toMatchSnapshot();
    });

    it('renders full nav when signed in', async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        expect(nav.children().length).toBe(7);
        expect(nav.text()).toContain('Sign Out');
    });

    it('renders the amt of items in cart', async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocksWithCartItems}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('[data-test="nav"]');
        // expect(toJson(nav)).toMatchSnapshot();
        const count = nav.find('div.count');
            expect(toJson(count)).toMatchSnapshot();
    })
})