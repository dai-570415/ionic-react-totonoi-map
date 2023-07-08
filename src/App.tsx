import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeSharp, sunnySharp, logInSharp } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';  
import './theme/global.css';
import './theme/mapbox.css';
import 'mapbox-gl/dist/mapbox-gl.css';

/* Routing */
import Map from './pages/MapScreen';
import Weather from './pages/WeatherScreen';
import User from './pages/UserScreen';

/* Fetchデータ */
import { useArticles, ArticlesContext } from './hooks/useArticles';

/* 認証 */
import PrivateRoute from './components/FirebaseAuth/PrivateRoute';
import { AuthProvider } from './components/FirebaseAuth/AuthProvider';
import SignIn from './components/FirebaseAuth/SignIn';
import SignUp from './components/FirebaseAuth/SignUp';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'トトノイマップ';
  }, []);

  const { articles } = useArticles();

  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <ArticlesContext.Provider value={articles}>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/signin" component={ SignIn } />
                <Route exact path="/signup" component={ SignUp } />
                <Route exact path="/" component={ Map } />
                <Route exact path="/weather" component={ Weather } />
                <PrivateRoute exact path="/user" component={ User } />

                <Route exact path="/top"><Redirect to="/" /></Route>
              </IonRouterOutlet>
              
              {/* ボトムタブナビゲーション */}
              <IonTabBar slot="bottom">
                <IonTabButton tab="top" href="/top">
                  <IonIcon aria-hidden="true" icon={homeSharp} />
                  <IonLabel><strong>トップ</strong></IonLabel>
                </IonTabButton>

                <IonTabButton tab="weather" href="/weather">
                  <IonIcon aria-hidden="true" icon={sunnySharp} />
                  <IonLabel><strong>天気</strong></IonLabel>
                </IonTabButton>

                <IonTabButton tab="signin" href="/signin">
                  <IonIcon aria-hidden="true" icon={logInSharp} />
                  <IonLabel><strong>ログイン</strong></IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </ArticlesContext.Provider>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
