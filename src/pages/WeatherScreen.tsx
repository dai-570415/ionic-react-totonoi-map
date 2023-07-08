import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components/Layout/Header';
import { Weather } from '../components/Weather/Weather';

const WeatherScreen = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Weather />
            </IonContent>
        </IonPage>
    );
}

export default WeatherScreen;