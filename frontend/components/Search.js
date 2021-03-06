import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!) {
        items(where: {
            OR: [
                {title_contains: $searchTerm},
                {description: $searchTerm}
            ]
        }) {
            id
            images
            title
            description
        }
    }
`;

function routeToItem(item) {
    Router.push({
        pathname: '/item',
        query: {
            id: item.id,
        }
    })
}

class AutoComplete extends Component {

    state = {
        items: [],
        loading: false
    }

    onChange = debounce(async (e, client) => {
        //turn loading on
        this.setState({ loading: true });

        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: { searchTerm: e.target.value }
        });
        this.setState({
            items: res.data.items,
            loading: false
        })
    }, 400);

    render() {
        return (
            <SearchStyles search={this.props.open} className={this.props.className || 'searchbar'} >
                <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                        <div>
                            <ApolloConsumer>
                                {client => (
                                    <input
                                        {...getInputProps({
                                            type: 'search',
                                            placeholder: 'Search For An Item',
                                            id: 'search',
                                            className: this.state.loading ? 'loading' : '',
                                            onChange: e => {
                                                e.persist();
                                                this.onChange(e, client);
                                            },
                                        })}
                                    />
                                )}
                            </ApolloConsumer>
                            {isOpen && (
                                <DropDown 
                                margin={this.props.className}
                                >
                                    {this.state.items.map((item, index) => (
                                        <DropDownItem
                                            {...getItemProps({
                                                item
                                            })}
                                            key={item.id}
                                            highlighted={index === highlightedIndex}
                                        >
                                            <img width="50" src={item.images[0]} alt={item.title} />
                                            {item.title}
                                            <br />
                                            <em> {item.description}</em>
                                        </DropDownItem>
                                    ))}
                                    {!this.state.items.length && !this.state.loading && <DropDownItem>Nothing Found for {inputValue}</DropDownItem>}
                                </DropDown>
                            )}
                        </div>
                    )}
                </Downshift>
            </SearchStyles>
        )
    }
};

export default AutoComplete;