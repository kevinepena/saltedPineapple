import React, { Component } from 'react';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveFromLocalCart from './RemoveFromCart';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 10px;
    }
    h3, p {
        margin: 0;
    }

`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            # isInCart @client
            id
            title
            description
            images
            largeImages
            price
            categories {
                id
                name
                item {
                    id
                }
            }
        }
    }
`;

class LocalCartItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No item found for {this.props.id}</p>
                    const cartItem = data.item;
                    return <CartItemStyles>
                        <img width='100' src={cartItem.images[0]} alt={cartItem.title} />
                        <div className="cart-item-details">
                            <h3>{cartItem.title}</h3>
                            <p>

                                <em>
                                    {formatMoney(cartItem.price)}
                                </em>
                            </p>
                        </div>
                        {/* <RemoveFromLocalCart num={this.props.num} /> */}
                    </CartItemStyles>;
                }}
            </Query>
        )
    }
}

LocalCartItem.propTypes = {
    id: PropTypes.string.isRequired
}

export default LocalCartItem;