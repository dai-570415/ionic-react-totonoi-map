import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

export const Header = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <img 
                        src={`${process.env.PUBLIC_URL}/assets/img/common/logo.svg`} 
                        style={{ width: 'auto', height: '32px', }}
                        alt="" 
                    />
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}