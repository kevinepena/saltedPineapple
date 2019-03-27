import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
// import { CURRENT_USER_QUERY } from './User';





// const Composed = adopt({
//     addToCart: ({ render }) => <Mutation mutation={SINGLE_ITEM_QUERY}>{render}</Mutation>,
//     localCart: ({ render }) => <Query query={LOCAL_CART_QUERY}>{render}</Query>,
//     items: ({ render }) => <Query query={ALL_ITEMS_QUERY}>{render}</Query>,
// });
const ADD_CART_MUTATION = gql`
            mutation ADD_CART_MUTATION($id: ID!) {
                addToCart(id: $id) @client
            }
        `;
class AddToCart extends Component {

    state = {
        clicked: false
    }
    changeState = (pas) => {
        this.setState({ clicked: true });
        setTimeout(function() {this.setState({ clicked: false })}.bind(this), 500);
        pas();
    }

    render() {
        const { id } = this.props;


        return (
            // null
            <Mutation mutation={ADD_CART_MUTATION} variables={{ id }}>
                {(addToCart, { loading, error }) => {
                    return <button onClick={e => {this.changeState(addToCart)}} className={this.state.clicked ? 'clicked addcart addlocalcart' : 'addcart addlocalcart'} disabled={loading}>
                    {this.state.clicked ? '✔' : 'Add To Cart'}
                    {/* <svg className="cartsvg" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="#797C80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                    </svg> */}
                    </button>
                }}
            </Mutation>
        )
    }
}

export default AddToCart;