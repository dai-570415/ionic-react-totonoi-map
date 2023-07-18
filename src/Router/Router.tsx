import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { 
    homeSharp, 
    logInOutline, 
    logOutOutline, 
    // newspaperSharp, 
    personAddSharp 
} from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import Map from '../pages/MapScreen';
import News from '../pages/NewsScreen';
import User from '../pages/UserScreen';

import SignIn from '../components/FirebaseAuth/SignIn';
import SignUp from '../components/FirebaseAuth/SignUp';
import PrivateRoute from '../components/FirebaseAuth/PrivateRoute';
import { useSignOut } from '../components/FirebaseAuth/hooks/useSignOut';

export const Router = () => {
    const { user, onSignOut } = useSignOut();

    return (
        <IonTabs>
            <IonRouterOutlet>
            <Route exact path="/signin" component={ SignIn } />
            <Route exact path="/signup" component={ SignUp } />
            <Route exact path="/" component={ Map } />
            <Route exact path="/news" component={ News } />
            <PrivateRoute exact path="/user" component={ User } />

            <Route exact path="/top"><Redirect to="/" /></Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="top" href="/top">
                    <IonIcon aria-hidden="true" icon={homeSharp} />
                    <IonLabel><strong>トップ</strong></IonLabel>
                </IonTabButton>

                {/* <IonTabButton tab="news" href="/news">
                    <IonIcon aria-hidden="true" icon={newspaperSharp} />
                    <IonLabel><strong>ニュース</strong></IonLabel>
                </IonTabButton> */}

                {user && (
                    <IonTabButton tab="user" href="/user">
                        <IonIcon aria-hidden="true" icon={personAddSharp} />
                        <IonLabel><strong>ユーザー</strong></IonLabel>
                    </IonTabButton>
                )}

                {user ? (
                    <IonTabButton tab="logout" onClick={onSignOut}>
                        <IonIcon aria-hidden="true" icon={logOutOutline} />
                        <IonLabel><strong>サインアウト</strong></IonLabel>
                    </IonTabButton>
                ) : (
                    <IonTabButton tab="signin" href="/signin">
                        <IonIcon aria-hidden="true" icon={logInOutline} />
                        <IonLabel><strong>サインイン</strong></IonLabel>
                    </IonTabButton>
                )}
            </IonTabBar>
        </IonTabs>
    );
}