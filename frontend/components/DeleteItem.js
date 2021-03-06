import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

class DeleteItem extends Component {

    update = (cache, payload) => {
        // Manually update the cache on client, so it matches server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY});
        // 2. Filter deleted item out of page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // 3. Put items back
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data});

    }
    render() {
        return (
            <Mutation 
            mutation={DELETE_ITEM_MUTATION} 
            variables={{ id: this.props.id }}
            update={this.update}
            // refetchQueries={ALL_ITEMS_QUERY}
            >
                {(deleteItem, { error }) => {
                    return <button className="delete" onClick={() => {
                        if (confirm('You sure you want to delete this?')) {
                            deleteItem().catch(err => alert(err.message));
                        }
                    }}>{this.props.children}</button>
                }}
            </Mutation>
        )
    }
}

export default DeleteItem;