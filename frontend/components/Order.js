import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderComp from '../components/Order';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import OrderStyles from './styles/OrderStyles';
import Error from './ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order(id: $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                price
                images
                quantity
            }
        }
    }
`;


class Order extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired
    }

    render() {
        return (
            <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }} onCompleted={this.subtotal}>
                {({ data, loading, error }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    const order = data.order;
                    const subtotal = [];

                    return (
                        <OrderStyles data-test="order">
                            <Head>
                                <title>Order {order.id} - Shopping Salted Pineapple</title>
                            </Head>
                            <p>
                                <span>Order ID:</span>
                                <span>{this.props.id}</span>
                            </p>
                            <p>
                                <span>Charge:</span>
                                <span>{order.charge}</span>
                            </p>
                            <p>
                                <span>Date:</span>
                                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
                            </p>

                            <p>
                                <span>Item Count:</span>
                                <span>{order.items.length}</span>
                            </p>
                            <div className="items">
                                {order.items.map((item, i) => (
                                    <div className="order-item" key={item.id}>
                                        <img src={item.image} alt={item.title} />
                                        <div className="item-details">
                                            <h2>{subtotal.push(item.price * item.quantity)}. {item.title}</h2>
                                            <p>Qty: {item.quantity}</p>
                                            <p>Each: {formatMoney(item.price)}</p>
                                            <p>Description: {item.description}</p>
                                            <p><span>Subtotal:</span><span>{formatMoney(subtotal.reduce((a, b) => a + b))}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>
                                <span>Order Total</span>
                                <span>{formatMoney(order.total)}</span>
                            </p>
                        </OrderStyles>
                    );
                }}
            </Query>
        )
    }
}

export default Order;
export { SINGLE_ORDER_QUERY };