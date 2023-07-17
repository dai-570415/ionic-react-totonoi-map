import { useEffect } from 'react';
import {
  IonApp,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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

/* Fetchデータ */
import { useArticles, ArticlesContext } from './hooks/useArticles';

/* 認証 */
import { AuthProvider } from './components/FirebaseAuth/AuthProvider';

/* ルーティング */
import { Router } from './Router/Router';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Totonoi Map';
  }, []);

  const { articles } = useArticles();

  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <ArticlesContext.Provider value={articles}>
            <Router />
          </ArticlesContext.Provider>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
