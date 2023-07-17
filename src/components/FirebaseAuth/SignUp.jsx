import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import { Header } from '../Layout/Header';
import { useContext } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from './AuthProvider';
import Styles from './css/Sign.module.css';

const Signup = ({ history }) => {
    const { signup } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        signup(email.value, password.value, history);
    }

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <section className={Styles.signPage}>
                    <h2>サインアップ</h2>
                    <form onSubmit={ handleSubmit }>
                        <input className={Styles.input} name="email" type="email" placeholder="メールアドレス" />
                        <input className={Styles.input} name="password" type="password" placeholder="パスワード" />
                        <button className={Styles.submitBtn} type="submit">サインアップ</button>
                    </form>
                    <Link to="/signin">登録ユーザーですか？ログイン</Link>
                </section>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Signup);