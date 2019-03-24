import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import BigButton from './styles/CloseButton'
import { adopt } from 'react-adopt';


const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
        color: ${props => props.theme.yellow};
        cursor: pointer;
    }
`;



const REMOVE_CART_MUTATION = gql`
            mutation ADD_CART_MUTATION($id: Int!) {
                removeFromCart(id: $id) @client
            }
        `;
class RemoveFromCart extends React.Component {
    render() {
        const { num } = this.props;
        console.log(num);
        return (
            <Mutation mutation={REMOVE_CART_MUTATION} variables={{ num }}>
                {(removeFromCart, { loading, error }) => (
                    <BigButton onClick={() => {
                        removeFromCart().catch(err => alert(err.message))
                    }} disabled={loading} title="Delete Item">
                        &times;
                        </BigButton>
                )}
            </Mutation>
        )
    }
}

export default RemoveFromCart;
// export { REMOVE_FROM_CART };