import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
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
            # isInCart @client
        }
    }
`;


const Center = styled.div`
    text-align: center;
`;

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;

    @media(max-width: 810px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    margin: 15px auto 15px auto;
    }
    @media(max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 5px;
    margin: 15px auto 15px auto;
    }
`;

class Items extends Component {

    render() {
        return (
            <Center>
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={{
                        skip: this.props.page * perPage - perPage,
                    }}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error: ${error.message}`;
                        const items = data.items;
                        const col1 = [];
                        const col2 = [];
                        const col3 = [];
                        let init = Math.floor(items.length / 3);
                        let extra = items.length % 3;
                        // if()
                        for (let i = 0; i < init; i++) {
                            col1.push(<Item item={items[i]} key={items[i].id} />);
                        }
                        for (let i = init; i < init * 2; i++) {
                            col2.push(<Item item={items[i]} key={items[i].id} />);
                        }
                        for (let i = init * 2; i < init * 3 + extra; i++) {
                            if (i < init * 3) col3.push(<Item item={items[i]} key={items[i].id} />);
                            if (i === init * 3) col1.push(<Item item={items[i]} key={items[i].id} />);
                            if (i === init * 3 + 1) col2.push(<Item item={items[i]} key={items[i].id} />);
                        }
                        return <ItemsList>
                            {/* <div>
                                {col1[0] && col1.map(item => item)}
                            </div>
                            <div>
                                {col2[0] && col2.map(item => item)}
                            </div>
                            <div>
                                {col3[0] && col3.map(item => item)}
                            </div> */}
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