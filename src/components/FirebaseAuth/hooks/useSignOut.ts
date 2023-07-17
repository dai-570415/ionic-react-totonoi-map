import { useContext } from 'react';
import firebase from '../../../Firebase';
import { AuthContext } from '../AuthProvider';

export const useSignOut = () => {
    const user = firebase.auth().currentUser;

    const { signout } = useContext(AuthContext);
    const onSignOut = () => {
        signout();
        (window as any).history.pushState(null, null, '/signin')
    }

    return { user, onSignOut };
}