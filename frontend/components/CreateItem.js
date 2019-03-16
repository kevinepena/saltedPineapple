import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $images: [String]!
        $largeImages: [String]!
        $category: [String]!
    ) {
        createItem(
            title: $title
            description: $description
            images: $images
            largeImages: $largeImages
            price: $price
            category: $category
        ) {
            id
        }
    }
`;

class CreateItem extends Component {

    state = {
        title: '',
        description: '',
        images: [],
        largeImages: [],
        category: []
    }

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;

        this.setState({ [name]: val })
    }

    uploadFile = async e => {

        let files = e.target.files;
        let filesArr = [];

        for (let i = 0; i < e.target.files.length; i++) {
            filesArr.push(files[i])
        }

        filesArr.forEach(async file => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'saltedpineapple');

            const res = await fetch
                ('https://api.cloudinary.com/v1_1/kevinpena/image/upload', {
                    method: 'POST',
                    body: data
                });

            const fileJ = await res.json();
            this.setState({
                images: [...this.state.images, fileJ.secure_url],
                largeImages: [...this.state.largeImages, fileJ.eager[0].secure_url]
            })
        })
    }

    render() {

        let empty = [];

        if (this.state.images.length > 0) {
            for (let i = 0; i < this.state.images.length; i++) {
                empty.push(<img key={i} style={{ width: '200px' }} src={this.state.images[i]} />)
            }
        }

        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form data-test="form" onSubmit={async e => {
                        e.preventDefault();
                        let words = await this.state.category.split(',');
                        words = await words.slice();
                        words = await words.map(word => word.toLowerCase());
                        words = await words.map(word => word.trim());
                        // console.log(this.state)
                        const res = await createItem({
                            variables: {
                                title: this.state.title,
                                description: this.state.description,
                                images: this.state.images,
                                largeImages: this.state.largeImages,
                                category: words
                            }
                        });

                        // const res = await createItem();
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="File">
                                Image
                    <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload an image"
                                    onChange={this.uploadFile}
                                    multiple
                                    required />
                                {this.state.image && <img style={{ width: '200px' }} src={this.state.image} alt="Upload Preview" />}
                            </label>
                            {empty[0] && empty}
                            <label htmlFor="title">
                                Title
                    <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    required />
                            </label>
                            <label htmlFor="price">
                                Price
                    <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    required />
                            </label>
                            <label htmlFor="description">
                                Description
                    <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter a description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required />
                            </label>
                            <label htmlFor="category">
                                Categories
                    <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    placeholder="Split categories by comma"
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>

        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
