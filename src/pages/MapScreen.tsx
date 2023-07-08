import {
    IonContent,
    IonPage,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import { Header } from '../components/Layout/Header';

const MapScreen: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const { mapContainerRef } = useMapbox(latitude, longitude);
            
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                {latitude && longitude && (
                    <div style={{ width: '100vw', height: '100vh' }} ref={mapContainerRef} />
                )}
            </IonContent>
        </IonPage>
    );
};

export default MapScreen;