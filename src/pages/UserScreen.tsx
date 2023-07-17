import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components/Layout/Header';
import { User } from '../components/User/User';

const UserScreen = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <User />
            </IonContent>
        </IonPage>
    );
}

export default UserScreen;