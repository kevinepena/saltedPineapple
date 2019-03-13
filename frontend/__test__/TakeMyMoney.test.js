import { mount } from 'enzyme';
import wait from 'waait';
import toJson from 'enzyme-to-json';
import NProgress from 'nprogress';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import TakeMyMoney from '../components/TakeMyMoney';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

Router.router = { push() { } };

const mocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem()]
                }
            }
        }
    }
];

describe('<TakeMyMoney />', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks} >
                <TakeMyMoney />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const checkoutButton = wrapper.find('ReactStripeCheckout');
        expect(toJson(checkoutButton)).toMatchSnapshot();
    })

    it('creates an order ontoken', () => {
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: { id: 'xyz789' } }
        });
        const wrapper = mount(
            <MockedProvider mocks={mocks} >
                <TakeMyMoney />
            </MockedProvider>
        );
        const component = wrapper.find('TakeMyMoney').instance();
        // manually call ontoken method
        component.onToken({ id: 'abc123' }, createOrderMock);
        expect(createOrderMock).toHaveBeenCalled();
        expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: 'abc123' } });
    });
    it('turns progress bar on', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks} >
                <TakeMyMoney />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        NProgress.start = jest.fn();
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: { id: 'xyz789' } }
        });
        const component = wrapper.find('TakeMyMoney').instance();
        component.onToken({ id: 'abc123' }, createOrderMock);
        // manually call ontoken method
        expect(NProgress.start).toHaveBeenCalled();
    });
    it('routes to order page when completed', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks} >
                <TakeMyMoney />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const createOrderMock = jest.fn().mockResolvedValue({
            data: { createOrder: { id: 'xyz789' } }
        });
        const component = wrapper.find('TakeMyMoney').instance();
        Router.router.push = jest.fn();
        // manually call ontoken method
        component.onToken({ id: 'abc123' }, createOrderMock);
        await wait();
        expect(Router.router.push).toHaveBeenCalledWith({ pathname: "/order", query: { id: "xyz789" } });
    });
})