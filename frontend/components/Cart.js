import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import User from './User';
import SickButton from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import CartItem from "./CartItem";
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';

const LOCAL_CART_QUERY = gql`
    query {
        cartOpen @client,
    }
`;

const LOCAL_STATE_QUERY = gql`
    query {
        cart @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;

const Composed = adopt({
    user: ({ render }) => <User>{render}</User>,
    toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
    localCart: ({ render }) => <Query query={LOCAL_CART_QUERY}>{render}</Query>,
    localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});


const Cart = () => (
    <Composed>
        {({ user, toggleCart, localCart, localState }) => {
            const me = user.data.me;

            if (!me) {
                console.log(localState)
                const { data } = localState;
                console.log(data)
                return (
                    <CartStyles open={localCart.data.cartOpen}>
                        <header>
                            <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                            {/* <Supreme>{me.name}'s Cart</Supreme> */}
                            <p>You have {data.cart.length} item{data.cart.length === 1 ? '' : 's'} in your cart!</p>
                        </header>
                        <ul>
                            {data.cart.map(cartItem => (
                                <CartItem key={cartItem} cartItem={cartItem} />
                            ))}
                        </ul>
                        <footer>
                            {/* <p style={{ display: !data.cart.length ? 'none' : '' }}>{data.cart.length && formatMoney(calcTotalPrice(me.cart))}</p> */}
                            {/* <p style={{ display: !data.cart.length ? 'none' : '' }}>{data.cart.length && (<TakeMyMoney><SickButton>Checkout!</SickButton></TakeMyMoney>)}</p> */}
                            {!data.cart.length && <p>No Items In Your Cart</p>}
                        </footer>
                    </CartStyles>
                )
            };
            return (
                <CartStyles open={localCart.data.cartOpen}>
                    <header>
                        <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
                        <Supreme>{me.name}'s Cart</Supreme>
                        <p>You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} in your cart!</p>
                    </header>
                    <ul>
                        {me.cart.map(cartItem => (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))}
                    </ul>
                    <footer>
                        <p style={{ display: !me.cart.length ? 'none' : '' }}>{me.cart.length && formatMoney(calcTotalPrice(me.cart))}</p>
                        <p style={{ display: !me.cart.length ? 'none' : '' }}>{me.cart.length && (<TakeMyMoney><SickButton>Checkout!</SickButton></TakeMyMoney>)}</p>
                        {!me.cart.length && <p>No Items In Your Cart</p>}
                    </footer>
                </CartStyles>
            );
        }}</Composed>
)

export default Cart;
export { TOGGLE_CART_MUTATION };
export { LOCAL_CART_QUERY };
export { LOCAL_STATE_QUERY };