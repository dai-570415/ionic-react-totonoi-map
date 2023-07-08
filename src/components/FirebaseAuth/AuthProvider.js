import React, { useState, useEffect } from 'react';
import firebase from '../../Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);

    const signin = async (email, password, history) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    }

    const signup = async (email, password, history) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    }

    const signout = () => {
        try {
            firebase.auth().signOut();
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signin: signin,
                signup: signup,
                signout: signout,
                currentUser
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}