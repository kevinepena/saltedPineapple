import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
// import { CURRENT_USER_QUERY } from './User';

// const SINGLE_ITEM_QUERY = gql`
//     query SINGLE_ITEM_QUERY($id: ID!) {
//         item(where: {id: $id}) {
//             isInCart @client
//             id
//             title
//             description
//             images
//             largeImages
//             categories {
//                 id
//                 name
//                 item {
//                     id
//                 }
//             }
//         }
//     }
// `;



// const Composed = adopt({
//     addToCart: ({ render }) => <Mutation mutation={SINGLE_ITEM_QUERY}>{render}</Mutation>,
//     localCart: ({ render }) => <Query query={LOCAL_CART_QUERY}>{render}</Query>,
//     item: ({ render }) => <Query query={SINGLE_ITEM_QUERY}>{render}</Query>,
// });
const ADD_CART_MUTATION = gql`
            mutation ADD_CART_MUTATION($id: ID!) {
                addToCart(id: $id) @client
            }
        `;
class AddToCart extends React.Component {
    render() {
        const { id } = this.props;

        return (
            // null
            <Mutation mutation={ADD_CART_MUTATION} variables={{ id }}>
                {(addToCart, { loading, error }) => (
                    <button disabled={loading} onClick={addToCart}>Add{loading ? 'ing' : ''} To Cart 🛒</button>
                )}
            </Mutation>
        )
    }
}

export default AddToCart;
export { ADD_CART_MUTATION };