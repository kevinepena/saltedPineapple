import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Item from './Item';

const SOME_ITEMS_QUERY = gql`
    query SOME_ITEMS_QUERY($name: String!) {
        items( where: { categories_some : {
            name: $name
        }}) {
            id
            title
            description
            images
            largeImages
            price
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


class Category extends Component {
    render() {
        return (
            <Query query={SOME_ITEMS_QUERY} variables={{ name: this.props.name }}>
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if (!data.items[0]) return <p>No posts found for #{this.props.name}</p>
                    
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
                    
                    return <Center>
                        <ItemsList>
                        <div>
                                {col1[0] && col1.map(item => item)}
                            </div>
                            <div>
                                {col2[0] && col2.map(item => item)}
                            </div>
                            <div>
                                {col3[0] && col3.map(item => item)}
                            </div>
                            {/* {data.items.map((item) => <Item item={item} key={item.id} />)} */}
                        </ItemsList>
                    </Center>
                }}
            </Query>
        )
    }
}

export default Category;