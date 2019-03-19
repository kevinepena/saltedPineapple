import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/MobileNavStyles';
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
                    <a>Shop</a>
                </Link>

                {me && (
                    <>
                        <Link href='/sell'>
                            <a>Sell</a>
                        </Link>
                        <Link href='/orders'>
                            <a>Orders</a>
                        </Link>
                        <Link href='/me'>
                            <a>Account</a>
                        </Link>
                        {
                            hasPermission(me, ['ADMIN']) ? <Link href="/permissions"><a>Users</a></Link> : ''
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