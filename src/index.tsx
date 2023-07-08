// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// serviceWorkerRegistration.register();
// reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event: Event) => {
        const stateChangeEvent = event as StateChangeEvent;
        if (stateChangeEvent.target.state === 'activated') {
          // 新しいバージョンのService Workerがアクティブになった場合の処理
          if (window.confirm('新しいバージョンが利用可能です。更新しますか？')) {
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      });
    }
  },
});

reportWebVitals();

interface StateChangeEvent extends Event {
  target: ServiceWorker;
}
