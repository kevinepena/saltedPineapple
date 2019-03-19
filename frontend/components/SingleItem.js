import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import Carousel from './Carousel';

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }

    div {
        grid-row: 2;
    grid-column-start: 3;
    grid-column-end: 4;
    }
    h2 {
        grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 3;
    margin: 0;
    padding: 15px;
    }
    .content {
        grid-row: 2;
        grid-column: 1/ 2;
        padding: 0 15px;
    }

    .description {
        grid-row: 2;
        grid-column: 3/4;
        /* position: absolute; */
        /* align-items: ; */
        bottom: 0;
        color: ${props => props.theme.lightgrey};
        align-self: self-end;
        z-index: 1;
        padding: 10px;
    }
    .tags {
        margin: 110px auto;
    }

    @media(max-width: 500px) {
        margin: 0 auto;

            grid-template-columns: repeat(2, 1fr);
    /* grid-auto-rows: 25% auto; */
        h2 {
            padding: 0 15px;
            grid-row: 1;
            grid-column-start: 1;
            grid-column-end: 3;
    }
    div {
        grid-row: 2;
        grid-column-start: 1;
        grid-column-end: 4
    }
    .description {
        font-size: 1rem;
        grid-row: 3;
        grid-column: 1 / -1;
        padding: 0 15px;
        transform: translateY(-90px);
        color: ${props => props.theme.lightgrey}
    }
    .content {
        /* transform: translateY(-80px); */
        grid-row: 3;
        grid-column: 1 / -1;
        padding: 0 15px 15px 15px;
    }

    img {
        object-fit: cover !important;
    }

    }

`;


const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id
            title
            description
            images
            largeImages
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

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No item found for {this.props.id}</p>
                    const item = data.item;


                    return <SingleItemStyles>
                        <Head>
                            <title>SP | {item.title}</title>
                        </Head>
                        <Carousel images={item.images} />
                            <h2>Viewing {item.title}</h2>
                            <p className="description">{item.description}</p>
                            <p className="content"></p>
                    </SingleItemStyles>
                }}
            </Query>
        )
    }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };