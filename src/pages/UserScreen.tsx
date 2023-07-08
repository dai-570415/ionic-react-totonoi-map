import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components/Layout/Header';
import SignOut from '../components/FirebaseAuth/SignOut';

const UserScreen = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <SignOut />
            </IonContent>
        </IonPage>
    );
}

export default UserScreen;