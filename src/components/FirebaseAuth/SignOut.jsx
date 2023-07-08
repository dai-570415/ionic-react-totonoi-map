import { useContext } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../Firebase'
import { AuthContext } from './AuthProvider';

const SignOut = () => {
    const user = firebase.auth().currentUser;

    const { signout } = useContext(AuthContext);
    const onSignOut = () => {
        signout();
        window.history.pushState(null, null, '/')
    }

    return (
        <>
            {user != null &&
                <button onClick={ onSignOut }>
                    Sign out
                </button>
            }
        </>
    );
}

export default withRouter(SignOut);