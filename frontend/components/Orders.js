import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import OrderItemStyles from './styles/OrderItemStyles';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ALL_ORDERS_QUERY = gql`
    query ALL_ORDERS_QUERY {
        orders(orderBy: createdAt_DESC) {
            id
            total
            createdAt
            items {
                id
                title
                price
                description
                quantity
                image
            }
            user {
                id
                name
                email
            }
            charge
        } 
    }
`;

const OrderUl = styled.ul`
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: repeat()(auto-fit, minmax(40%, 1fr));
`;

class Orders extends Component {

    render() {
        return (
            <Query
                query={ALL_ORDERS_QUERY}
                fetchPolicy='cache-and-network'
            >
                {({ loading, error, data: { orders } }) => {
                    if (loading) return "Loading...";
                    if (error) return <Error error={error} />;

                    return (
                        <div>
                            <h2>You have {orders.length} orders</h2>
                            <OrderUl>
                                {orders.map(order => (
                                    <OrderItemStyles key={order.id}>
                                        <Link href={{
                                            pathname: '/order',
                                            query: { id: order.id }
                                        }}>
                                            <a><div className="order-meta">
                                                {/* <p>
                                                    {order.items.length}
                                                    {order.items.length === 1 ? ' Product' : ' Products'}
                                                    {order.id}
                                                </p> */}
                                                <p>
                                                    {order.items.reduce((a, b) => a + b.quantity, 0)}
                                                    {order.items.reduce((a, b) => a + b.quantity, 0) === 1 ? ' Item' : ' Items'}
                                                </p>
                                                <p>Purchased {formatDistance(order.createdAt, new Date())} ago</p>
                                                <p>{formatMoney(order.total)}</p>
                                            </div>
                                                <div className="images">
                                                    {order.items.map(item => (
                                                        <img key={item.id} src={item.image} alt={item.title} />
                                                    ))}
                                                </div>
                                            </a>
                                        </Link>
                                    </OrderItemStyles>
                                ))}
                            </OrderUl>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Orders;