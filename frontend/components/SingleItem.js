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
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 400px;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  `;
  const ran = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    background: #F8D353;
    background: -webkit-linear-gradient(top left, #F8D353, #FF5C5A);
    background: -moz-linear-gradient(top left, #F8D353, #FF5C5A);
    background: linear-gradient(top left, #F8D353, #FF5C5A);
    background-color: #FBAB7E;
background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
    /* background-color: #c2eec1; */
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23a5caa4' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E"); */
    grid-template-columns: 1fr;
    grid-template-columns: repeat(4, 1fr);


    div:nth-of-type(1) {
        /* grid-column: 2 / 4; */
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
/* 
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
    } */

    .description {
        /* grid-row: 2; */
        /* grid-column: 3/4; */
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
    img {
        object-fit: cover !important;
    }

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
                        <div>

                        <h2>{item.title}</h2>
                        <p className="description">{item.description}</p>
                        </div>
                        {/* <p className="content"></p> */}
                    </SingleItemStyles>
                }}
            </Query>
        )
    }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };