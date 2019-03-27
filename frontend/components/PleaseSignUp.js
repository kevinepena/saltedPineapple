import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signup from './Signup';

const PleaseSignUp = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (!data.me) {
                return (
                    <div>
                        <p>Please Sign Up Before Continuing</p>
                        <Signup />
                    </div>
                )
            }
            return props.children;
        }}
    </Query>
);

export default PleaseSignUp;