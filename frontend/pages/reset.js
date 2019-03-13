import ResetComp from '../components/Reset';

const Reset = props => (
    <div>
        <ResetComp resetToken={props.query.resetToken} />
    </div>
);

export default Reset;