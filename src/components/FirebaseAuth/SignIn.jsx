import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import { Header } from '../Layout/Header';
import { useContext, Suspense } from 'react';
import { AuthContext } from './AuthProvider';
import { withRouter } from 'react-router';
import GoogleAuth from './GoogleAuth';

let result = null;
const timeout = (msec) => new Promise(resolve => {
    setTimeout(resolve, msec)
});

// LazyComponent(遅延)
const LazyComponent = ({ history }) => {
    const { signin } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        signin(email.value, password.value, history);
    }
    
    if (result !== null) {
        return (
            <section>
                <h2>サインイン</h2>
                <button onClick={ GoogleAuth }>
                    Googleでサインイン
                </button>
                <div className="or">または</div>
                <form onSubmit={ handleSubmit }>
                    <input className="create-input" name="email" type="email" placeholder="メールアドレス"/>
                    <input className="create-input" name="password" type="password" placeholder="パスワード"/>
                    <button className="create-button" type="submit">サインイン</button>
                </form>
                <div className="link">
                    <Link to="/signup">新規ユーザーですか？登録</Link>
                </div>
            </section>
        )
    }
    throw new Promise(async(resolve) => {
        await timeout(0);
        result = 'lazy';
        resolve();
    })
};

const Signin = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent/>
                </Suspense>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Signin);