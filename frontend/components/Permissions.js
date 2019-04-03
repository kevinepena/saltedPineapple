import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
]

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            name
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = (props) => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
            return (
                <div>
                    <Error error={error} />
                    <div>
                        <h2>Manage Users</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    {possiblePermissions.map(perm => <th key={perm}>{perm}</th>)}
                                    <th>👇</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map(user => <UserPermissions key={user.id} user={user} />)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
        }
        }
    </Query>
);


const Label = styled.label`
width: 30px;
height: 30px;
border-radius: 5px;
margin: 0 auto;
border: ${props => props.active ? '1px solid black' : `1px solid ${props.theme.red}`};
padding: 0 !important;
polyline {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    height: 30px;
    animation: dash .8s linear forwards;
    /* animation: ${props => props.active ? 'dash' : 'undash'} 1s linear forwards; */
    fill: none;
    stroke: black;
    stroke-width: 50px;
    display: ${props => props.active ? '' : 'none'};
    transition: all 1s;
    @keyframes undash {

        from {
            stroke-dashoffset: 0;
        }
                to {
                    stroke-dashoffset: 1000;
                    }
                };
    @keyframes dash {
                to {
                    stroke-dashoffset: 0;
                    }
                };
}
`;

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array,
        }).isRequired,
    };

    state = {
        permissions: this.props.user.permissions
    }

    onChange = e => {
        const checkbox = e.target;
        // take a copy of the current permissions
        let updatePermisssions = [...this.state.permissions];
        // figure out if permission needs to be added or removed
        if (checkbox.checked) {
            updatePermisssions.push(checkbox.value);
        } else {
            updatePermisssions = updatePermisssions.filter(permission => permission !== checkbox.value);
        }
        this.setState({ permissions: updatePermisssions })
    }

    render() {
        const user = this.props.user;





        return (
            <Mutation mutation={UPDATE_PERMISSIONS_MUTATION}
                variables={{
                    permissions: this.state.permissions,
                    userId: user.id
                }}>
                {(updatePermisssion, { loading, error }) => (
                    <>
                        {error && <tr><td colSpan="9"><Error error={error} /></td></tr>}
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {possiblePermissions.map(perm => (
                                <td key={perm}>
                                    <Label htmlFor={`${user.id}-permission-${perm}`} active={this.state.permissions.includes(perm)} >
                                        <svg id="Layer_1" style={{ height: '30px' }} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                                            {/* <Checkmark points='114,245 194,323 370,140' /> */}
                                            <polyline
                                                // fill="none"
                                                // stroke="black"
                                                // stroke-width="50px"
                                                // className="check"
                                                active={this.state.permissions.includes(perm)}
                                                points="114,245 194,323 370,140" />
                                        </svg>
                                        <input
                                            id={`${user.id}-permission-${perm}`}
                                            type="checkbox"
                                            style={{ display: 'none' }}
                                            checked={this.state.permissions.includes(perm)}
                                            value={perm}
                                            onChange={this.onChange}
                                        />
                                    </Label>
                                </td>
                            ))}
                            <td>

                                <SickButton
                                    type="button"
                                    disabled={loading}
                                    onClick={updatePermisssion}>
                                    Updat{loading ? 'ing' : 'e'}
                                </SickButton>
                            </td>

                        </tr>
                    </>
                )}
            </Mutation>
        )
    }
}

export default Permissions;