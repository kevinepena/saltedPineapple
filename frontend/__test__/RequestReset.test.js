import { mount } from 'enzyme';
import wait from 'waait';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

const mocks = [
    {
        request: {
            query: REQUEST_RESET_MUTATION,
            variables: { email: 'kevinpena160@gmail.com' },
        },
        result: {
            data: {
                requestReset: {
                    message: 'success', __typename: 'Message'
                }
            }
        },
    }
];

describe('<RrequestReset />', () => {
    it('renders and matches snapshot', () => {
        const wrapper = mount(
            <MockedProvider>
                <RequestReset />
            </MockedProvider>
        );
        const form = wrapper.find('form[data-test="form"]');
        expect(toJson(form)).toMatchSnapshot();
    });

    it('calls the mutation', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <RequestReset />
            </MockedProvider>
        );
        // simulate typing and email
        wrapper
        .find('input')
        .simulate('change', { target: { name: 'email', value: 'kevinpena160@gmail.com' } });
        //submit form
        wrapper.find('input').simulate('submit');
        await wait();
        wrapper.update();
        expect(wrapper.find('p').text()).toContain('Success! Check email for reset link');

    })

})