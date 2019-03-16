import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            images
            largeImages
            categories {
                id
                name
            }
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    @media(max-width: 500px) {
    grid-template-columns: 1fr;
    margin: 15px auto 0 auto;

    }
`;

class Items extends Component {
    render() {
        return (
            <Center>
                <Pagination page={this.props.page} />
                <Query 
                query={ALL_ITEMS_QUERY} 
                variables={{
                    skip: this.props.page * perPage - perPage,
                }}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error: ${error.message}`;
                        return <ItemsList>
                            {data.items.map((item, i) => <div key={i}><Item item={item} key={item.id} /></div>)}
                        </ItemsList>
                    }}
                </Query>
                <Pagination page={this.props.page} />
            </Center>
        )
    }
}

export default Items;
export { ALL_ITEMS_QUERY };