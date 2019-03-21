import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './Signout';
import CartCount from './CartCount';
import CartItem from './CartItem';
import Search from './Search';

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

class Nav extends React.Component {

    state = {
        search: false
    }

    searchButt = () => {
        this.setState({ search: !this.state.search });
    }
    render() {

        return (
            <User>
                {({ data: { me } }) => (
                    // <div>
                    <NavStyles search={this.state.search} className="nav" data-test='nav'>
                        <div className="shop">
                            <Link href='/items'>
                                <a className="shop" data-hover="Shop">Shop<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></a>

                            </Link>
                            <div className="dropdown">
                                <Link>
                                    <a data-hover='Bracelets'>Bracelets</a>
                                </Link>
                                <Link>
                                    <a data-hover='Necklaces'>Necklaces</a>
                                </Link>
                            </div>
                        </div>

                        {me && (
                            <>
                                <Link href='/sell'>
                                    <a className="sell" data-hover="Sell">Sell</a>
                                </Link>

                                <Search search={this.state.search} />
                                <div className="search" onClick={this.searchButt}>
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FB7BE" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </a>

                                </div>

                                <div className="me">
                                    {/* <Link href='/me'> */}
                                    <a data-hover=''>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </a>
                                    {/* </Link> */}
                                    <div className="dropdown">
                                        <Link href='/orders'>
                                            <a data-hover="Orders">Orders</a>
                                        </Link>
                                        {
                                            hasPermission(me, ['ADMIN']) ? <Link href="/permissions"><a data-hover="Users">Users</a></Link> : ''
                                        }
                                        <SignOut />
                                    </div>
                                </div>
                                <Mutation mutation={TOGGLE_CART_MUTATION}>
                                    {(toggleCart) => (
                                        <button onClick={toggleCart}>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#797C80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg> */}
                                            <CartCount count={me.cart.reduce((tally, CartItem) => tally + CartItem.quantity, 0)} /></button>
                                    )}
                                </Mutation>
                            </>
                        )}


                        {!me && (
                            <>
                                <Search />
                                <div className="search" onClick={this.searchButt}>
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FB7BE" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </a>

                                </div>
                                <Link href='/signup'>
                                    <a data-hover="Sign In">Sign In</a>
                                </Link>
                                <Mutation mutation={TOGGLE_CART_MUTATION}>
                                    {(toggleCart) => (
                                        <button onClick={toggleCart}>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#797C80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#797C80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg> */}
                                            {/* <CartCount count={me.cart.reduce((tally, CartItem) => tally + CartItem.quantity, 0)} /> */}
                                            </button>
                                    )}
                                </Mutation>
                            </>
                        )}
                    </NavStyles>
                    // </div>
                )}
            </User>
        )
    }
}

export default Nav;