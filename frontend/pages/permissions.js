import PleaseSignIn from '../components/PleaseSignIn';
import PermissionsComp from '../components/Permissions';

const Permissions = (props) => (
    <div>
        <PleaseSignIn>
            <PermissionsComp />
        </PleaseSignIn>
    </div>
)

export default Permissions;