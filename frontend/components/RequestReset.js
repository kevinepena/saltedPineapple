import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

class RequestReset extends Component {

    state = {
        email: '',
    }

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state} >
                {(requestReset, { loading, error, called }) => (
                    <Form method="post" data-test='form' onSubmit={async (e) => {
                        e.preventDefault();
                        const success = await requestReset();
                        this.setState({ email: '' })
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Request password reset</h2>
                            <Error error={error} />
                            {!error && !loading && called  && <p>Success! Check email for reset link</p>}
                            <label htmlFor="email">
                                Email
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.saveToState} />
                            </label>
                            <button type="submit">Enter</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default RequestReset;
export { REQUEST_RESET_MUTATION };