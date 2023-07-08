import firebase from '../../Firebase';

const GoogleAuth = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            const token = result.credential.accessToken;
            console.log(token);
        }
        const user = result.user;
        console.log(user);
    }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    });
}

export default GoogleAuth;