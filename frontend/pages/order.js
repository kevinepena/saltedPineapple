import PleaseSignIn from '../components/PleaseSignIn';
import OrderComp from '../components/Order';

const Order = (props) => (
    <div>
        <PleaseSignIn>
            <OrderComp id={props.query.id} />
        </PleaseSignIn>
    </div>
)

export default Order;