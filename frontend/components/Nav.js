import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './Signout';
import CartCount from './CartCount';
import CartItem from './CartItem';

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


const Nav = () => (
    <User>
        {({ data: { me } }) => (
            // <div>
            <NavStyles className="nav" data-test='nav'>
                <Link href='/items'>
                    <a data-hover="Shop">Shop</a>
                </Link>

                {me && (
                    <>
                        <Link href='/sell'>
                            <a data-hover="Sell">Sell</a>
                        </Link>
                        <Link href='/orders'>
                            <a data-hover="Orders">Orders</a>
                        </Link>
                        <Link href='/me'>
                            <a data-hover="Account">Account</a>
                        </Link>
                        {
                            hasPermission(me, ['ADMIN']) ? <Link href="/permissions"><a data-hover="Users">Users</a></Link> : ''
                        }
                        <SignOut />
                        <Mutation mutation={TOGGLE_CART_MUTATION}>
                            {(toggleCart) => (
                                <button onClick={toggleCart}>My Cart <CartCount count={me.cart.reduce((tally, CartItem) => tally + CartItem.quantity, 0)} /></button>
                            )}
                        </Mutation>
                    </>
                )}

                {!me && (
                    <Link href='/signup'>
                        <a>Sign In</a>
                    </Link>
                )}
            </NavStyles>
            // </div>
        )}
    </User>
)

export default Nav;