import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import { Header } from '../Layout/Header';
import { useContext } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from './AuthProvider';

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
                <section>
                    <h2>サインアップ</h2>
                    <form onSubmit={ handleSubmit }>
                        <input name="email" type="email" placeholder="メールアドレス" />
                        <input name="password" type="password" placeholder="パスワード" />
                        <button type="submit">サインアップ</button>
                    </form>
                    <Link to="/signin">登録ユーザーですか？ログイン</Link>
                </section>
            </IonContent>
        </IonPage>
    );
}

export default withRouter(Signup);