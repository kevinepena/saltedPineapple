import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`;

const Signout = () => (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => {
            return <button  onClick={signout}>
            {/* <a href="/" data-hover="Sign Out"> */}
            Sign Out
            {/* </a> */}
            </button>;
        }}
    </Mutation>
)


export default Signout;