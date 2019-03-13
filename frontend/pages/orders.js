import PleaseSignIn from '../components/PleaseSignIn';
import OrdersComp from '../components/Orders';

const Orders = (props) => (
    <div>
        <PleaseSignIn>
            <OrdersComp />
        </PleaseSignIn>
    </div>
)

export default Orders;