import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import { Header } from '../Layout/Header';
import { useContext, Suspense } from 'react';
import { AuthContext } from './AuthProvider';
import { withRouter } from 'react-router';
import GoogleAuth from './GoogleAuth';
import Styles from './css/Sign.module.css';
import GoogleIcon from './img/google.svg';

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
            <section className={Styles.signPage}>
                <h2>サインイン</h2>
                <button className={Styles.googleSighIn} onClick={ GoogleAuth }>
                    <img src={GoogleIcon} alt="Googleでサインイン" />
                    <span>Googleでサインイン</span>
                </button>
                <div className={Styles.or}>または</div>
                <form onSubmit={ handleSubmit }>
                    <input className={Styles.input} name="email" type="email" placeholder="メールアドレス"/>
                    <input className={Styles.input} name="password" type="password" placeholder="パスワード"/>
                    <button className={Styles.submitBtn} type="submit">サインイン</button>
                </form>
                
                <Link to="/signup">新規ユーザーですか？登録</Link>
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