import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Item from './styles/ItemStyles';
import AddLocalCart from './AddLocalCart';
import CarouselComp from './Carousel';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import User from './User'

function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = user.permissions.filter(permissionTheyHave =>
        permissionsNeeded.includes(permissionTheyHave)
    );
    if (!matchedPermissions.length) {
        return false;
    } else {
        return true;
    }
}

export default class Items extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    render() {
        const { item } = this.props;
        const { categories } = item;

        let arr = [];

        categories[0] && categories.forEach(cat => {
            arr.push(<Link key={cat.id} href={{ pathname: '/category', query: { name: cat.name } }}><a>{cat.name}</a></Link>)
        })

        return (
            <User>
                {({ data: { me } }) => (


                    <ItemStyles>
                        <CarouselComp images={item.images} />

                        <Title>
                            <Link href={{
                                pathname: '/item',
                                query: { id: item.id }
                            }}>
                                <a>{item.title}</a>
                            </Link>
                        </Title>
                        <PriceTag>{formatMoney(item.price)}</PriceTag>
                        <p>{item.description}</p>
                        <div className="tags">{arr[0] && arr}</div>

                        <div className="buttonList">
                            {me && hasPermission(me, ['ADMIN']) && (
                                <>
                                    <Link href={{
                                        pathname: '/update',
                                        query: { id: item.id }
                                    }}>
                                        <a>Edit ✏️</a>
                                    </Link>
                                    <DeleteItem id={item.id}>Delete This Item</DeleteItem>
                                </>
                            )}

                            {!me && (
                                <>
                                    <AddLocalCart id={item.id}></AddLocalCart>
                                </>
                            )}

                            {me && (
                                <>
                                    <AddToCart id={item.id}></AddToCart>
                                </>
                            )}
                        </div>
                    </ItemStyles>
                )}
            </User>

        )
    }
}
