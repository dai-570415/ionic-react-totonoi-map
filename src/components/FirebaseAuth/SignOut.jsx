import { withRouter } from 'react-router';
import { useSignOut } from './hooks/useSignOut';

const SignOut = () => {
    const { user, onSignOut } = useSignOut();

    return (
        <>
            {user != null &&
                <button onClick={ onSignOut }>
                    Sign Out
                </button>
            }
        </>
    );
}

export default withRouter(SignOut);