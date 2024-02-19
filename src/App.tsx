import React from 'react';

import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import ApplicationNavigator from './navigators/Application';
import { persistor, store } from './store';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
